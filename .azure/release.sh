#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
  echo ".env file not found!"
  exit 1
fi

# Load the environment variables from .env file
source .env

# Read each line in the .env file
while IFS= read -r line || [ -n "$line" ]; do
  # Skip empty lines and comments
  if [[ -z "$line" || "$line" == \#* ]]; then
    continue
  fi

  # Extract the variable name and value
  IFS='=' read -r var_name var_value <<< "$line"

  # Remove surrounding quotes from the value, if present
  var_value=$(echo $var_value | sed 's/^"//;s/"$//')

  # Export the variable with TF_VAR_ prefix
  export TF_VAR_$var_name=$var_value
  echo "Exported $var_name as TF_VAR_$var_name"
#   env | grep TF_VAR_$var_name # Uncomment this line to see the exported variable

done < .env
