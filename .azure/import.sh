#!/bin/bash

# Load environment variables
source .env.local

# Load Terraform variables and initialize Terraform
source local.sh && terraform init \
    -backend-config="container_name=${backend_container_name}" \
    -backend-config="storage_account_name=${backend_storage_account_name}" \
    -backend-config="key=terraform.tfstate" \
    -backend-config="resource_group_name=rg-tfstate" \
    && echo "Terraform initialized successfully." \
    && terraform import resource_name.domshyra "/subscriptions/sub_id/resourceGroups/rg-domshyra/providers/Microsoft.KeyVault/vaults/kv-vault/objectId/obj_id" \
