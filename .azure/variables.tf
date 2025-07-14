variable "app_service_plan" {
  description = "values for the app service"
  type = object({
    name           = string
    resource_group = string
    location       = string
  })
  default = {
    name           = "asp-domdeckard"
    resource_group = "rg-asp"
    location       = "westus2"
  }
}

variable "repo" {
  description = "repository details"
  type = object({
    name       = string
    short_name = string
  })
  default = {
    name       = "domshyra"
    short_name = "domshyra" # note this can only be 11 characters
  }
}

variable "region" {
  default = "westus2"
}
variable "region_long_name" {
  default = "West US 2"
}
variable "app_services" {
  description = "values for the app service"
  type = object({
    types          = list(string)
    node_version   = string
    dotnet_version = string
  })
  default = {
    types          = ["web", "api"]
    node_version   = "22"
    dotnet_version = "9.0"
  }
}
variable "key_vault" {
  description = "Key Vault name"
  type = object({
    name           = string
    uri            = string
    resource_group = string
  })
  default = {
    name           = "KV-NAME",
    uri            = "https://KV_NAME.vault.azure.net/"
    resource_group = "rg-asp"
  }
}

# variable "client_id" {
#   sensitive   = true
#   description = "from .env.local"
#   type        = string
# }
variable "subscription_id" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
# variable "client_secret" {
#   sensitive   = true
#   description = "from .env.local"
#   type        = string
# }
variable "tenant_id" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
variable "godaddy_api_key" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
variable "godaddy_api_secret" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
variable "site_password" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
variable "spotify_client_id" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
variable "spotify_client_secret" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
