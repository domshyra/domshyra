variable "region" {
  description = "Azure region for resources"
  type = object({
    location  = string
    long_name = string
  })
  default = {
    location  = "westus2"
    long_name = "West US 2"
  }
}

variable "app_service_plan" {
  description = "values for the app service"
  type = object({
    name           = string
    resource_group = string
  })
  default = {
    name           = "asp-domdeckard"
    resource_group = "rg-asp"
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
#TODO? figure out how to use this in backend configuration
variable "backend" {
  description = "Backend configuration variables"
  type = object({
    container_name       = string
    key                  = string
    resource_group_name  = string
    storage_account_name = string
  })
  default = {
    container_name       = "domshyra-tfstate"
    key                  = "terraform.tfstate"
    resource_group_name  = "rg-tfstate"
    storage_account_name = "sadomshyratfstates"
  }
}
#region private variables

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
variable "digicert_host_url" {
  sensitive   = true
  description = "DigiCert ONE API base URL"
  type        = string
}
variable "digicert_api_key" {
  sensitive   = true
  description = "DigiCert API key for authentication"
  type        = string
}
#endregion 
