#region Terraform Backend and Providers
terraform {
  backend "azurerm" {
  }
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 4.36.0"
    }
    godaddy-dns = {
      source  = "registry.terraform.io/veksh/godaddy-dns"
      version = ">= 0.3.12"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "4.1.0"
    }
    acme = {
      source  = "vancluever/acme"
      version = "2.35.1"
    }

  }

  required_version = ">= 1.1.0"
}
#endregion

#region Providers
provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy    = true
      recover_soft_deleted_key_vaults = true
    }
  }

  # client_id       = var.client_id
  # client_secret   = var.client_secret
  tenant_id       = var.tenant_id
  subscription_id = var.subscription_id
}

# keys from env
provider "godaddy-dns" {
  api_key    = var.godaddy_api_key
  api_secret = var.godaddy_api_secret

}
provider "tls" {
  # Configuration options
}
provider "acme" {
  // use staging for testing, production for live
  server_url = var.prod_cert ? "https://acme-staging-v02.api.letsencrypt.org/directory" : "https://acme-v02.api.letsencrypt.org/directory"
}
#endregion

#region Locals
locals {
  azure_sites_name = {
    web = "${var.repo.name}-web.azurewebsites.net",
    api = "${var.repo.name}-api.azurewebsites.net"
  }
  domain_names = {
    web     = "${var.repo.name}.com",
    api     = "${var.repo.name}api.com",
    www-web = "www.${var.repo.name}.com",
    www-api = "www.${var.repo.name}api.com"
  }
  dns_types = ["web", "api", "www-web", "www-api"]
}
#endregion

#region Azure resource group

# Resource group for the application
resource "azurerm_resource_group" "domshyra" {
  name     = "rg-${var.repo.short_name}"
  location = var.region.long_name

  tags = { Area = var.repo.name }
}
#endregion

#region Azure Key Vault


data "azurerm_client_config" "current" {}
# Key Vault for storing secrets
# Uncomment and configure the Key Vault resource if needed
resource "azurerm_key_vault" "domshyra" {
  name                        = "kv-${var.repo.short_name}"
  location                    = azurerm_resource_group.domshyra.location
  resource_group_name         = azurerm_resource_group.domshyra.name
  enabled_for_disk_encryption = true
  tenant_id                   = var.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"
  tags = {
    Area = var.repo.name
  }
}
resource "azurerm_key_vault_access_policy" "domshyra" {
  key_vault_id = azurerm_key_vault.domshyra.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azurerm_client_config.current.object_id

  secret_permissions = [
    "Get",
    "List",
  ]

  key_permissions = [
    "Verify"
  ]

  certificate_permissions = [
    "Get",
    "List",
    "Create",
    "Update",
    "Delete",
    "Purge",
    "Import"
  ]
}

#endregion

#region Log Analytics Workspace and Application Insights

# Log Analytics Workspace for monitoring
resource "azurerm_log_analytics_workspace" "domshyra" {
  for_each = toset(var.app_services.types)

  depends_on = [azurerm_resource_group.domshyra]

  name                = "managed-${var.repo.short_name}-${each.value}-ws"
  location            = var.region.location
  resource_group_name = azurerm_resource_group.domshyra.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags = {
    Area = var.repo.name
  }
}
# Application Insights for telemetry
resource "azurerm_application_insights" "domshyra" {
  for_each = toset(var.app_services.types)

  depends_on = [azurerm_resource_group.domshyra, azurerm_log_analytics_workspace.domshyra]


  name                = "${var.repo.short_name}-${each.value}-ai"
  location            = var.region.location
  resource_group_name = azurerm_resource_group.domshyra.name
  application_type    = each.value == "web" ? "web" : "other"
  retention_in_days   = 90
  workspace_id        = azurerm_log_analytics_workspace.domshyra[each.key].id
  tags = {
    Area = var.repo.name
  }
}
# User-assigned managed identity for the application
resource "azurerm_user_assigned_identity" "domshyra" {
  depends_on = [azurerm_resource_group.domshyra]

  for_each = toset(var.app_services.types)

  name                = "${var.repo.short_name}-${each.value}-mi"
  location            = var.region.location
  resource_group_name = azurerm_resource_group.domshyra.name
  tags = {
    Area = var.repo.name
  }
}
#endregion

#region App Service

# Windows Web App for hosting the application
resource "azurerm_windows_web_app" "domshyra" {
  depends_on = [azurerm_resource_group.domshyra, azurerm_application_insights.domshyra, azurerm_user_assigned_identity.domshyra]

  for_each = toset(var.app_services.types)

  name                       = "${var.repo.short_name}-${each.value}"
  location                   = var.region.location
  resource_group_name        = azurerm_resource_group.domshyra.name
  service_plan_id            = "/subscriptions/${var.subscription_id}/resourceGroups/${var.app_service_plan.resource_group}/providers/Microsoft.Web/serverFarms/${var.app_service_plan_name}"
  https_only                 = true
  client_certificate_enabled = false
  # client_certificate_mode    = "Required" # Uncomment if you want to enforce client certificates

  tags = {
    Area = var.repo.name
  }

  app_settings = {
    "APPLICATIONINSIGHTS_CONNECTION_STRING"      = azurerm_application_insights.domshyra[each.key].connection_string
    "APPINSIGHTS_INSTRUMENTATIONKEY"             = azurerm_application_insights.domshyra[each.key].instrumentation_key
    "ApplicationInsightsAgent_EXTENSION_VERSION" = "~2"
    "XDT_MicrosoftApplicationInsights_Mode"      = "default"

    "WEBSITE_NODE_DEFAULT_VERSION"            = each.value == "web" ? "~${var.app_services.node_version}" : null
    "XDT_MicrosoftApplicationInsights_NodeJS" = each.value == "web" ? "1" : null

    "FrontEndUrl"           = each.value == "api" ? "https://${var.repo.name}.com" : null
    "FrontEndUrlWww"        = each.value == "api" ? "https://www.${var.repo.name}.com" : null
    "FrontEndUrlAzureSites" = each.value == "api" ? "https://${local.azure_sites_name.web}" : null # this is for the web cors
    "SitePassword"          = each.value == "api" ? var.site_password : null
    "VaultUri"              = each.value == "api" ? "https://${azurerm_key_vault.domshyra.name}.vault.azure.net/" : null
    "Spotify:ClientId"      = each.value == "api" ? var.spotify_client_id : null
    "Spotify:ClientSecret"  = each.value == "api" ? var.spotify_client_secret : null
  }

  site_config {
    always_on         = false
    http2_enabled     = true
    default_documents = ["index.html"]
    application_stack {
      current_stack  = each.value == "web" ? "node" : "dotnet"
      node_version   = each.value == "web" ? "~${var.app_services.node_version}" : null
      dotnet_version = each.value == "api" ? "v${var.app_services.dotnet_version}" : null
    }
    cors {
      allowed_origins = each.value == "api" ? [
        "https://${var.repo.name}.com",
        "https://www.${var.repo.name}.com",
        "https://${local.azure_sites_name.web}"
      ] : null
    }
    # Default application mapping for root path
    virtual_application {
      virtual_path  = "/"                                                             # The virtual path you want to map
      physical_path = each.value == "web" ? "site\\wwwroot\\dist" : "site\\wwwroot\\" # The physical path in the web app
      preload       = true                                                            # Optional: Preload the application
    }
  }

}

#endregion

#region GoDaddy DNS records

# go daddy settings for DNS records
resource "godaddy-dns_record" "c_name" {
  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "CNAME"
  name   = "www"
  data   = each.value == "web" ? local.azure_sites_name.web : local.azure_sites_name.api
  ttl    = 3600 # Set TTL to 1 hour
}
resource "godaddy-dns_record" "txt" {
  depends_on = [azurerm_windows_web_app.domshyra]

  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "TXT"
  name   = "asuid"
  data   = azurerm_windows_web_app.domshyra[each.value].custom_domain_verification_id
  ttl    = 3600 # Set TTL to 1 hour
}
resource "godaddy-dns_record" "txt_www" {
  depends_on = [azurerm_windows_web_app.domshyra]

  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "TXT"
  name   = "asuid.www"
  data   = azurerm_windows_web_app.domshyra[each.value].custom_domain_verification_id
  ttl    = 3600 # Set TTL to 1 hour
}

locals {
  app_service_inbound_ip_api = azurerm_windows_web_app.domshyra["api"].outbound_ip_address_list[length(azurerm_windows_web_app.domshyra["api"].outbound_ip_address_list) - 1]
  app_service_inbound_ip_web = azurerm_windows_web_app.domshyra["web"].outbound_ip_address_list[length(azurerm_windows_web_app.domshyra["web"].outbound_ip_address_list) - 1]
}
#note: if this cert fails make sure godaddy-dns_record.a_record is empty in dns records on GoDaddy.com
resource "godaddy-dns_record" "a_record" {
  depends_on = [azurerm_windows_web_app.domshyra]

  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "A"
  name   = "@"
  data   = each.value == "web" ? local.app_service_inbound_ip_web : local.app_service_inbound_ip_api # Use the last outbound IP address from the web app
  ttl    = 600                                                                                       # Set TTL to 10 minutes
}


#endregion


#region Monitoring and Alerts

# Action Group for monitoring alerts
resource "azurerm_monitor_action_group" "domshyra" {
  depends_on = [azurerm_resource_group.domshyra]

  for_each = toset(var.app_services.types)

  name                = "${var.repo.short_name}-${each.value}-ag"
  resource_group_name = azurerm_resource_group.domshyra.name
  short_name          = var.repo.short_name

  tags = {
    Area = var.repo.name
  }
}

# Smart Detector Alert Rule for monitoring failures
resource "azurerm_monitor_smart_detector_alert_rule" "domshyra" {
  depends_on = [azurerm_resource_group.domshyra, azurerm_application_insights.domshyra]

  for_each = toset(var.app_services.types)

  name                = "failure anomalies - ${var.repo.short_name}-${each.value}"
  resource_group_name = azurerm_resource_group.domshyra.name
  description         = "Failure Anomalies notifies you of an unusual rise in the rate of failed HTTP requests or dependency calls."
  severity            = "Sev3"
  frequency           = "PT1M"
  detector_type       = "FailureAnomaliesDetector"
  scope_resource_ids  = [azurerm_application_insights.domshyra[each.key].id]

  action_group {
    ids = [azurerm_monitor_action_group.domshyra[each.key].id]
  }

  tags = {
    Area = var.repo.name
  }
}

#endregion


#region Custom Domain and DNS Records
resource "azurerm_dns_zone" "domshyra" {
  for_each = toset(local.dns_types)

  name                = local.domain_names[each.value]
  resource_group_name = azurerm_resource_group.domshyra.name
}

resource "azurerm_app_service_custom_hostname_binding" "domshyra" {
  depends_on = [
    azurerm_resource_group.domshyra,
    azurerm_windows_web_app.domshyra,
    godaddy-dns_record.txt,
    godaddy-dns_record.txt_www,
  ]
  for_each = toset(local.dns_types)

  hostname            = local.domain_names[each.value]
  app_service_name    = strcontains(each.value, "web") ? azurerm_windows_web_app.domshyra["web"].name : azurerm_windows_web_app.domshyra["api"].name
  resource_group_name = azurerm_resource_group.domshyra.name

  lifecycle {
    ignore_changes = [ssl_state, thumbprint]
  }
}
#endregion

#region Certificates

resource "tls_private_key" "acme_account_key" {
  for_each = toset(var.app_services.types)

  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "acme_registration" "domshyra" {
  for_each = toset(var.app_services.types)

  account_key_pem = tls_private_key.acme_account_key[each.value].private_key_pem
  email_address   = "domshyra@gmail.com"
}

resource "acme_certificate" "certificate" {
  depends_on = [
    acme_registration.domshyra,
    tls_private_key.acme_account_key,
  ]

  for_each = toset(var.app_services.types)

  account_key_pem = acme_registration.domshyra[each.value].account_key_pem
  common_name     = local.domain_names[each.value]
  key_type        = tls_private_key.acme_account_key[each.value].rsa_bits

  subject_alternative_names = [
    local.domain_names[each.value],
    local.domain_names["www-${each.value}"],
  ]

  dns_challenge {
    provider = "godaddy"
    config = {
      GODADDY_API_KEY    = var.godaddy_api_key
      GODADDY_API_SECRET = var.godaddy_api_secret
    }
  }
}

resource "azurerm_key_vault_certificate" "domshyra" {
  depends_on = [azurerm_key_vault.domshyra, acme_certificate.certificate]
  for_each   = toset(var.app_services.types)

  name         = "${each.value}-cert"
  key_vault_id = azurerm_key_vault.domshyra.id

  certificate {
    contents = acme_certificate.certificate[each.value].certificate_p12
  }
}

//! NOTE THESE NEED TO BE DONE MANUALLY FOR NOW
//? https://github.com/hashicorp/terraform-provider-azurerm/issues/30572

// hide the cert via portal no matter if i use KV or If I roll it my own with pfx_blob
# resource "azurerm_app_service_certificate" "domshyra" {
#   depends_on = [
#     azurerm_app_service_custom_hostname_binding.domshyra,
#     acme_certificate.certificate,
#     azurerm_resource_group.domshyra,
#   ]
#   for_each = toset(var.app_services.types)

#   resource_group_name = azurerm_resource_group.domshyra.name
# name                = "${azurerm_key_vault.domshyra.name}-${azurerm_key_vault_certificate.domshyra[each.value].name}"
#   location            = azurerm_resource_group.domshyra.location
#   key_vault_secret_id = azurerm_key_vault_certificate.domshyra[each.value].secret_id
#   # pfx_blob            = acme_certificate.certificate[each.value].certificate_p12
#   # pfx_blob          = each.value == "web" ? local.cert-web-ms : local.cert-api-ms # fails but has the whole token in it output

#   tags = { Area = var.repo.name }
# }

// This will 404 because the above step will banish the cert to another server farm
# resource "azurerm_app_service_certificate_binding" "domshyra" {
#   depends_on = [
#     azurerm_app_service_custom_hostname_binding.domshyra,
#     azurerm_app_service_certificate.domshyra,
#     godaddy-dns_record.txt,
#     godaddy-dns_record.txt_www,
#   ]
#   for_each = toset(local.dns_types)

#   hostname_binding_id = azurerm_app_service_custom_hostname_binding.domshyra[each.value].id
#   certificate_id      = strcontains(each.value, "web") ? azurerm_app_service_certificate.domshyra["web"].id : azurerm_app_service_certificate.domshyra["api"].id
#   ssl_state           = "SniEnabled"

#   lifecycle {
#     ignore_changes = [ssl_state]
#   }
# }

#endregion

