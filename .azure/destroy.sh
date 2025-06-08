#!/bin/bash

# Load Terraform variables and destroy resources
source local.sh && terraform destroy
