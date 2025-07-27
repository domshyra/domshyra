#!/bin/bash

# Load Terraform variables and plan changes
source local.sh && terraform plan -out=tfplan && echo "Terraform plan created successfully."
if [ $? -ne 0 ]; then
  echo "Terraform plan failed."
  exit 1
fi
source local.sh && terraform apply tfplan && echo "Terraform apply executed successfully."
