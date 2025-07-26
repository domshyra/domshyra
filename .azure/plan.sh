#!/bin/bash

# Load Terraform variables and plan changes
source local.sh && terraform plan -out=tfplan
