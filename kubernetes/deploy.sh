#!/usr/bin/env bash

declare ktl
ktl=$(which kubecolor 2> /dev/null || echo "kubectl")

# resources
kind load docker-image --name winvoice winvoice-gui:0.1.0

# apply
$ktl apply -Rf gui/
