output "app_service_publish_profile_api" {
  value = azurerm_windows_web_app.domshyra["api"].id
}

output "app_service_publish_profile_web" {
  value = azurerm_windows_web_app.domshyra["web"].id
}

output "app_service_client_id_api" {
  value = azurerm_user_assigned_identity.domshyra["api"].principal_id
}

output "app_service_client_id_web" {
  value = azurerm_user_assigned_identity.domshyra["web"].principal_id
}

output "app_service_inbound_ip_api" {
  value = azurerm_windows_web_app.domshyra["api"].outbound_ip_address_list[length(azurerm_windows_web_app.domshyra["api"].outbound_ip_address_list) - 1]
}
output "app_service_inbound_ip_web" {
  value = azurerm_windows_web_app.domshyra["web"].outbound_ip_address_list[length(azurerm_windows_web_app.domshyra["web"].outbound_ip_address_list) - 1]
}
