# Configure the Azure provider
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "sadomshyratfstates"
    container_name       = "domshyra-tfstate"
    key                  = "terraform.tfstate"
  }
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.7.0"
    }
    godaddy-dns = {
      source = "registry.terraform.io/veksh/godaddy-dns"
    }
    # acme = {
    #   source  = "vancluever/acme"
    #   version = ">= 2.0.0"
    # }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy    = true
      recover_soft_deleted_key_vaults = true
    }
  }

  # client_id       = var.client_id
  # client_secret   = var.client_secret
  # tenant_id       = var.tenant_id
  subscription_id = var.subscription_id
}

# keys from env
provider "godaddy-dns" {
  api_key    = var.godaddy_api_key
  api_secret = var.godaddy_api_secret
}

# provider "acme" {
#   server_url = "https://acme-staging-v02.api.letsencrypt.org/directory"
# }

# Resource group for the application
resource "azurerm_resource_group" "repository_name" {
  name     = "rg-${var.repo.short_name}"
  location = var.region_long_name
}


# Key Vault for storing secrets
# Uncomment and configure the Key Vault resource if needed
# resource "azurerm_key_vault" "repository_name" {
#   name                        = var.key_vault_name
#   location                    = azurerm_resource_group.repository_name.location
#   resource_group_name         = azurerm_resource_group.repository_name.name
#   enabled_for_disk_encryption = true
#   tenant_id                   = var.tenant_id
#   soft_delete_retention_days  = 7
#   purge_protection_enabled    = false

#   sku_name = "standard"

#   access_policy {
#     tenant_id = var.tenant_id
#     # object_id = doesn't work here, needs to be the resource that uses the key vault?? 
#     object_id = "/subscriptions/${var.subscription_id}/resourceGroups/${var.key_vault_resource_group}/providers/Microsoft.KeyVault/vaults/${var.key_vault_name}"

#     key_permissions = [
#       "Get",
#     ]

#     secret_permissions = [
#       "Get",
#     ]

#     storage_permissions = [
#       "Get",
#     ]
#   }
# }

# Data source to fetch secrets from Azure Key Vault
# Uncomment and configure the data source if needed
# data "azurerm_key_vault_secret" "example_var" {
#   name         = "valueOfSecret"
#   key_vault_id = azurerm_key_vault.repository_name.id
# }


# Log Analytics Workspace for monitoring
resource "azurerm_log_analytics_workspace" "repository_name" {
  for_each = toset(var.app_services.types)

  depends_on = [azurerm_resource_group.repository_name]

  name                = "managed-${var.repo.short_name}-${each.value}-ws"
  location            = var.region
  resource_group_name = "rg-${var.repo.short_name}"
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
  location            = var.region
  resource_group_name = "rg-${var.repo.short_name}"
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
  location            = var.region
  resource_group_name = "rg-${var.repo.short_name}"
  tags = {
    Area = var.repo.name
  }
}

# Windows Web App for hosting the application
resource "azurerm_windows_web_app" "repository_name" {
  depends_on = [azurerm_resource_group.repository_name, azurerm_application_insights.repository_name, azurerm_user_assigned_identity.repository_name]

  for_each = toset(var.app_services.types)

  name                       = "${var.repo.short_name}-${each.value}"
  location                   = var.region
  resource_group_name        = "rg-${var.repo.short_name}"
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
    "VaultUri"             = each.value == "api" ? var.key_vault.uri : null
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


# Action Group for monitoring alerts
resource "azurerm_monitor_action_group" "repository_name" {
  depends_on = [azurerm_resource_group.repository_name]

  for_each = toset(var.app_services.types)

  name                = "${var.repo.short_name}-${each.value}-ag"
  resource_group_name = "rg-${var.repo.short_name}"
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
  resource_group_name = "rg-${var.repo.short_name}"
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

resource "azurerm_app_service_custom_hostname_binding" "www_repository_name" {
  depends_on = [azurerm_resource_group.repository_name, azurerm_windows_web_app.repository_name]

  for_each = toset(var.app_services.types)

  hostname            = each.value == "web" ? "www.${var.repo.name}.com" : "www.${var.repo.name}${each.value}.com"
  app_service_name    = azurerm_windows_web_app.repository_name[each.value].name
  resource_group_name = azurerm_resource_group.repository_name.name
}
resource "azurerm_app_service_custom_hostname_binding" "repository_name" {
  depends_on = [azurerm_resource_group.repository_name, azurerm_windows_web_app.repository_name]

  for_each = toset(var.app_services.types)

  hostname            = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  app_service_name    = azurerm_windows_web_app.repository_name[each.value].name
  resource_group_name = azurerm_resource_group.repository_name.name
}


# resource "acme_certificate" "certificate" {
#   account_key_pem = var.acme_account_key_pem
#   common_name     = "www.example.com"
#   dns_challenge {
#     provider = "godaddy"

#     config = {
#       GODADDY_API_KEY    = var.godaddy_api_key
#       GODADDY_API_SECRET = var.godaddy_api_secret
#     }
#   }
# }

# go daddy settings for DNS records
resource "godaddy-dns_record" "c_name" {
  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "CNAME"
  name   = "www"
  data   = "${var.repo.name}${each.value}.azurewebsites.net."
  ttl    = 3600 # Set TTL to 1 hour
}
resource "godaddy-dns_record" "txt" {
  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "TXT"
  name   = "asuid"
  data   = azurerm_windows_web_app.repository_name[each.value].custom_domain_verification_id
  ttl    = 3600 # Set TTL to 1 hour
}
resource "godaddy-dns_record" "txt_www" {
  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "TXT"
  name   = "asuid.www"
  data   = azurerm_windows_web_app.repository_name[each.value].custom_domain_verification_id
  ttl    = 3600 # Set TTL to 1 hour
}
resource "godaddy-dns_record" "a_record" {
  for_each = toset(var.app_services.types)

  domain = each.value == "web" ? "${var.repo.name}.com" : "${var.repo.name}${each.value}.com"
  type   = "A"
  name   = "@"
  data   = azurerm_windows_web_app.repository_name[each.value].outbound_ip_address_list[0] # ip address of the web app
  ttl    = 600                                                                             # Set TTL to 10 minutes
}

output "app_service_publish_profile_api" {
  value = azurerm_windows_web_app.repository_name["api"].id
}

output "app_service_publish_profile_web" {
  value = azurerm_windows_web_app.repository_name["web"].id
}

output "app_service_client_id_api" {
  value = azurerm_user_assigned_identity.repository_name["api"].principal_id
}

output "app_service_client_id_web" {
  value = azurerm_user_assigned_identity.repository_name["web"].principal_id
}
