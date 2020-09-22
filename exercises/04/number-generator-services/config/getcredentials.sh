#!/bin/bash
export CLIENT_NAME=number-generator-client
export CLIENT_NAMESPACE=stage

export CLIENT_ID="$(kubectl get secret -n $CLIENT_NAMESPACE $CLIENT_NAME -o jsonpath='{.data.client_id}' | base64 --decode)"
echo "The CLIENT_ID  generated for generator-client is: " $CLIENT_ID
export CLIENT_SECRET="$(kubectl get secret -n $CLIENT_NAMESPACE $CLIENT_NAME -o jsonpath='{.data.client_secret}' | base64 --decode)"
echo "The CLIENT_SECRET generated for generator-client is: " $CLIENT_SECRET
export ENCODED_CREDENTIALS=$(echo -n "$CLIENT_ID:$CLIENT_SECRET" | base64)
echo "The ENCODED_CREDENTIALS generated for generator-client is: " $ENCODED_CREDENTIALS
