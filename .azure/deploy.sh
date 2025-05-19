#!/bin/bash

# deploy the release settings krunk
source release.sh && terraform init && terraform validate && terraform apply
