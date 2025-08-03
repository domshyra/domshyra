#region Terraform Backend and Providers
terraform {
  backend "azurerm" {
    # Note: vars aren't allowed in backend configuration
    resource_group_name  = "rg-tfstate"
    storage_account_name = "sadomshyratfstates"
    container_name       = "domshyra-tfstate"
    key                  = "terraform.tfstate"
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
    digicert = {
      source  = "digicert/digicert"
      version = ">= 0.1.3"
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
provider "digicert" {
  url     = var.digicert_host_url
  api_key = var.digicert_api_key
}
#endregion

#region Azure resource group

# Resource group for the application
resource "azurerm_resource_group" "repository_name" {
  name     = "rg-${var.repo.short_name}"
  location = var.region.long_name
}
#endregion

#region Azure Key Vault


data "azurerm_client_config" "current" {}
# Key Vault for storing secrets
# Uncomment and configure the Key Vault resource if needed
resource "azurerm_key_vault" "repository_name" {
  name                        = "kv-${var.repo.short_name}"
  location                    = azurerm_resource_group.repository_name.location
  resource_group_name         = azurerm_resource_group.repository_name.name
  enabled_for_disk_encryption = true
  tenant_id                   = var.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"

  access_policy {
    tenant_id = var.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    storage_permissions = [
      "Get",
    ]

    certificate_permissions = [
      "Create",
      "Delete",
      "DeleteIssuers",
      "Get",
      "GetIssuers",
      "Import",
      "List",
      "ListIssuers",
      "ManageContacts",
      "ManageIssuers",
      "SetIssuers",
      "Update",
    ]

    key_permissions = [
      "Backup",
      "Create",
      "Decrypt",
      "Delete",
      "Encrypt",
      "Get",
      "Import",
      "List",
      "Purge",
      "Recover",
      "Restore",
      "Sign",
      "UnwrapKey",
      "Update",
      "Verify",
      "WrapKey",
    ]

    secret_permissions = [
      "Backup",
      "Delete",
      "Get",
      "List",
      "Purge",
      "Recover",
      "Restore",
      "Set",
    ]
  }
}

# Data source to fetch secrets from Azure Key Vault
# Uncomment and configure the data source if needed
# data "azurerm_key_vault_secret" "example_var" {
#   name         = "valueOfSecret"
#   key_vault_id = azurerm_key_vault.repository_name.id
# }

#endregion

#region Log Analytics Workspace and Application Insights

# Log Analytics Workspace for monitoring
resource "azurerm_log_analytics_workspace" "repository_name" {
  for_each = toset(var.app_services.types)

  depends_on = [azurerm_resource_group.repository_name]

  name                = "managed-${var.repo.short_name}-${each.value}-ws"
  location            = var.region.location
  resource_group_name = azurerm_resource_group.repository_name.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags = {
    Area = var.repo.name
  }
}

# Application Insights for telemetry
resource "azurerm_application_insights" "repository_name" {
  for_each = toset(var.app_services.types)

  depends_on = [azurerm_resource_group.repository_name, azurerm_log_analytics_workspace.repository_name]


  name                = "${var.repo.short_name}-${each.value}-ai"
  location            = var.region.location
  resource_group_name = azurerm_resource_group.repository_name.name
  application_type    = each.value == "web" ? "web" : "other"
  retention_in_days   = 90
  workspace_id        = azurerm_log_analytics_workspace.repository_name[each.key].id
  tags = {
    Area = var.repo.name
  }
}

# User-assigned managed identity for the application
resource "azurerm_user_assigned_identity" "repository_name" {
  depends_on = [azurerm_resource_group.repository_name]

  for_each = toset(var.app_services.types)

  name                = "${var.repo.short_name}-${each.value}-mi"
  location            = var.region.location
  resource_group_name = azurerm_resource_group.repository_name.name
  tags = {
    Area = var.repo.name
  }
}
#endregion

#region App Service

# Windows Web App for hosting the application
resource "azurerm_windows_web_app" "repository_name" {
  depends_on = [azurerm_resource_group.repository_name, azurerm_application_insights.repository_name, azurerm_user_assigned_identity.repository_name]

  for_each = toset(var.app_services.types)

  name                       = "${var.repo.short_name}-${each.value}"
  location                   = var.region.location
  resource_group_name        = azurerm_resource_group.repository_name.name
  service_plan_id            = "/subscriptions/${var.subscription_id}/resourceGroups/${var.app_service_plan.resource_group}/providers/Microsoft.Web/serverFarms/${var.app_service_plan.name}"
  https_only                 = true
  client_certificate_enabled = true
  client_certificate_mode    = "Required"

  tags = {
    Area = var.repo.name
  }

  app_settings = {
    "APPLICATIONINSIGHTS_CONNECTION_STRING"      = azurerm_application_insights.repository_name[each.key].connection_string
    "APPINSIGHTS_INSTRUMENTATIONKEY"             = azurerm_application_insights.repository_name[each.key].instrumentation_key
    "ApplicationInsightsAgent_EXTENSION_VERSION" = "~2"
    "XDT_MicrosoftApplicationInsights_Mode"      = "default"

    "WEBSITE_NODE_DEFAULT_VERSION"            = each.value == "web" ? "~${var.app_services.node_version}" : null
    "XDT_MicrosoftApplicationInsights_NodeJS" = each.value == "web" ? "1" : null

    "FrontEndUrl"          = each.value == "api" ? "https://${var.repo.name}.com" : null
    "FrontEndUrlWww"       = each.value == "api" ? "https://www.${var.repo.name}.com" : null
    "SitePassword"         = each.value == "api" ? var.site_password : null
    "VaultUri"             = each.value == "api" ? "https://${azurerm_key_vault.repository_name.name}.vault.azure.net/" : null
    "Spotify:ClientId"     = each.value == "api" ? var.spotify_client_id : null
    "Spotify:ClientSecret" = each.value == "api" ? var.spotify_client_secret : null
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

    # Default application mapping for root path
    virtual_application {
      virtual_path  = "/"                                                             # The virtual path you want to map
      physical_path = each.value == "web" ? "site\\wwwroot\\dist" : "site\\wwwroot\\" # The physical path in the web app
      preload       = true                                                            # Optional: Preload the application
    }
  }

}

#endregion

#region Monitoring and Alerts

# Action Group for monitoring alerts
resource "azurerm_monitor_action_group" "repository_name" {
  depends_on = [azurerm_resource_group.repository_name]

  for_each = toset(var.app_services.types)

  name                = "${var.repo.short_name}-${each.value}-ag"
  resource_group_name = azurerm_resource_group.repository_name.name
  short_name          = var.repo.short_name

  tags = {
    Area = var.repo.name
  }
}

# Smart Detector Alert Rule for monitoring failures
resource "azurerm_monitor_smart_detector_alert_rule" "repository_name" {
  depends_on = [azurerm_resource_group.repository_name, azurerm_application_insights.repository_name]

  for_each = toset(var.app_services.types)

  name                = "failure anomalies - ${var.repo.short_name}-${each.value}"
  resource_group_name = azurerm_resource_group.repository_name.name
  description         = "Failure Anomalies notifies you of an unusual rise in the rate of failed HTTP requests or dependency calls."
  severity            = "Sev3"
  frequency           = "PT1M"
  detector_type       = "FailureAnomaliesDetector"
  scope_resource_ids  = [azurerm_application_insights.repository_name[each.key].id]

  action_group {
    ids = [azurerm_monitor_action_group.repository_name[each.key].id]
  }

  tags = {
    Area = var.repo.name
  }
}

#endregion

#region GoDaddy DNS records

# go daddy settings for DNS records
resource "godaddy-dns_record" "c_name" {
  depends_on = [azurerm_windows_web_app.repository_name]

  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "CNAME"
  name   = "www"
  data   = "${var.repo.name}${each.value}.azurewebsites.net."
  ttl    = 3600 # Set TTL to 1 hour
}
resource "godaddy-dns_record" "txt" {
  depends_on = [azurerm_windows_web_app.repository_name]

  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "TXT"
  name   = "asuid"
  data   = azurerm_windows_web_app.repository_name[each.value].custom_domain_verification_id
  ttl    = 3600 # Set TTL to 1 hour
}
resource "godaddy-dns_record" "txt_www" {
  depends_on = [azurerm_windows_web_app.repository_name]

  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "TXT"
  name   = "asuid.www"
  data   = azurerm_windows_web_app.repository_name[each.value].custom_domain_verification_id
  ttl    = 3600 # Set TTL to 1 hour
}
locals {
  app_service_inbound_ip_api = azurerm_windows_web_app.repository_name["api"].outbound_ip_address_list[length(azurerm_windows_web_app.repository_name["api"].outbound_ip_address_list) - 1]
  app_service_inbound_ip_web = azurerm_windows_web_app.repository_name["web"].outbound_ip_address_list[length(azurerm_windows_web_app.repository_name["web"].outbound_ip_address_list) - 1]
}
#note: if this cert fails make sure godaddy-dns_record.a_record is empty in dns records on GoDaddy.com
resource "godaddy-dns_record" "a_record" {
  depends_on = [azurerm_windows_web_app.repository_name]

  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "A"
  name   = "@"
  data   = each.value == "web" ? local.app_service_inbound_ip_web : local.app_service_inbound_ip_api # Use the last outbound IP address from the web app
  ttl    = 600                                                                                       # Set TTL to 10 minutes
}
#endregion

#region azure cert 

resource "azurerm_key_vault_certificate_issuer" "repository_name" {
  name          = "${var.repo.short_name}-issuer"
  key_vault_id  = azurerm_key_vault.repository_name.id
  provider_name = "DigiCert"
}

resource "azurerm_key_vault_certificate" "repository_name" {
  for_each = toset(var.app_services.types)

  name         = "${var.repo.short_name}-${each.value}-cert"
  key_vault_id = azurerm_key_vault.repository_name.id

  # certificate {
  #   contents = filebase64("${var.certificate.filename}")
  #   password = var.certificate.password
  # }

  certificate_policy {
    issuer_parameters {
      name = azurerm_key_vault_certificate_issuer.repository_name.provider_name
    }

    key_properties {
      exportable = true
      key_size   = 2048
      key_type   = "RSA"
      reuse_key  = true
    }
    lifetime_action {
      action {
        action_type = "AutoRenew"
      }

      trigger {
        days_before_expiry = 30
      }
    }


    secret_properties {
      content_type = "application/x-pkcs12"
    }

    x509_certificate_properties {
      # Server Authentication = 1.3.6.1.5.5.7.3.1
      # Client Authentication = 1.3.6.1.5.5.7.3.2
      extended_key_usage = [
        "1.3.6.1.5.5.7.3.1",
        "1.3.6.1.5.5.7.3.2"
      ]

      key_usage = [
        "cRLSign",
        "dataEncipherment",
        "digitalSignature",
        "keyAgreement",
        "keyCertSign",
        "keyEncipherment",
      ]

      subject_alternative_names {
        dns_names = [
          each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com",
          each.value == "web" ? "www.${var.repo.name}.com" : "www.${var.repo.name}${each.value}.com",
        ]
      }
      subject            = each.value == "web" ? "CN=${var.repo.name}.com" : "CN=${var.repo.name}${each.value}.com"
      validity_in_months = 12

    }
  }
}

#endregion

#region Custom Domain and DNS Records
resource "azurerm_dns_zone" "www_repository_name" {
  depends_on = [azurerm_resource_group.repository_name]
  for_each   = toset(var.app_services.types)

  name                = each.value == "web" ? "www.${var.repo.name}.com" : "www.${var.repo.name}${each.value}.com"
  resource_group_name = azurerm_resource_group.repository_name.name
}
resource "azurerm_app_service_custom_hostname_binding" "www_repository_name" {
  depends_on = [azurerm_resource_group.repository_name, azurerm_windows_web_app.repository_name, azurerm_dns_zone.www_repository_name]

  for_each = toset(var.app_services.types)

  hostname            = each.value == "web" ? "www.${var.repo.name}.com" : "www.${var.repo.name}${each.value}.com"
  app_service_name    = azurerm_windows_web_app.repository_name[each.value].name
  resource_group_name = azurerm_resource_group.repository_name.name

  lifecycle {
    ignore_changes = [ssl_state, thumbprint]
  }
}
# resource "azurerm_app_service_managed_certificate" "www_repository_name" {
#   depends_on = [
#     godaddy-dns_record.a_record,
#     azurerm_app_service_custom_hostname_binding.www_repository_name,
#   ]

#   for_each = toset(var.app_services.types)

#   custom_hostname_binding_id = azurerm_app_service_custom_hostname_binding.www_repository_name[each.value].id

#   tags = {
#     Area = var.repo.name
#   }
#   # Ensure step to verify the certificate creation
#   lifecycle {
#     create_before_destroy = true
#   }
# }
resource "azurerm_app_service_certificate_binding" "www_repository_name" {
  depends_on = [
    azurerm_key_vault_certificate.repository_name,
    azurerm_app_service_custom_hostname_binding.www_repository_name,
  ]

  for_each = toset(var.app_services.types)

  hostname_binding_id = azurerm_app_service_custom_hostname_binding.www_repository_name[each.value].id
  certificate_id      = azurerm_key_vault_certificate.repository_name[each.value].id
  ssl_state           = "SniEnabled"

  lifecycle {
    ignore_changes = [ssl_state]
  }
}

# .repo_name.com
resource "azurerm_dns_zone" "repository_name" {
  depends_on = [azurerm_resource_group.repository_name, azurerm_app_service_certificate_binding.www_repository_name]
  for_each   = toset(var.app_services.types)

  name                = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  resource_group_name = azurerm_resource_group.repository_name.name

  tags = {
    Area = var.repo.name
  }
}
resource "azurerm_app_service_custom_hostname_binding" "repository_name" {
  depends_on = [azurerm_resource_group.repository_name, azurerm_windows_web_app.repository_name, azurerm_dns_zone.repository_name]

  for_each = toset(var.app_services.types)

  hostname            = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  app_service_name    = azurerm_windows_web_app.repository_name[each.value].name
  resource_group_name = azurerm_resource_group.repository_name.name

  lifecycle {
    ignore_changes = [ssl_state, thumbprint]
  }

}
# resource "azurerm_app_service_managed_certificate" "repository_name" {
#   depends_on = [
#     azurerm_app_service_custom_hostname_binding.repository_name,
#     godaddy-dns_record.a_record,
#   ]

#   for_each = toset(var.app_services.types)

#   custom_hostname_binding_id = azurerm_app_service_custom_hostname_binding.repository_name[each.value].id

#   timeouts {
#     create = "15m" # 5 instead of 30 for testing
#   }

#   tags = {
#     Area = var.repo.name
#   }
#   # Ensure step to verify the certificate creation
#   lifecycle {
#     create_before_destroy = true
#   }
# }

resource "azurerm_app_service_certificate_binding" "repository_name" {
  depends_on = [
    azurerm_key_vault_certificate.repository_name,
    azurerm_app_service_custom_hostname_binding.repository_name,
  ]

  for_each = toset(var.app_services.types)

  hostname_binding_id = azurerm_app_service_custom_hostname_binding.repository_name[each.value].id
  certificate_id      = azurerm_key_vault_certificate.repository_name[each.value].id
  ssl_state           = "SniEnabled"

  lifecycle {
    ignore_changes = [ssl_state]
  }
}

#endregion

