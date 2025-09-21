#!/bin/bash

# Load Terraform variables and plan changes
source init.sh &&
TF_LOG=DEBUG terraform plan -out=tfplan && echo "Terraform plan created successfully."
if [ $? -ne 0 ]; then
  echo "Terraform plan failed."
fi
