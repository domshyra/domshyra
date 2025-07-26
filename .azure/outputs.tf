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
output "app_service_certificate_binding_api" {
  value = azurerm_app_service_certificate_binding.repository_name["api"].id
}
output "app_service_certificate_binding_web" {
  value = azurerm_app_service_certificate_binding.repository_name["web"].id
}
