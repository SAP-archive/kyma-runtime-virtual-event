#!/bin/bash
export CLIENT_NAME=lottery-client
export CLIENT_NAMESPACE=stage
export DOMAIN=kyma.local

export CLIENT_ID="$(kubectl get secret -n $CLIENT_NAMESPACE $CLIENT_NAME -o jsonpath='{.data.client_id}' | base64 --decode)"
export CLIENT_SECRET="$(kubectl get secret -n $CLIENT_NAMESPACE $CLIENT_NAME -o jsonpath='{.data.client_secret}' | base64 --decode)"
export ENCODED_CREDENTIALS=$(echo -n "$CLIENT_ID:$CLIENT_SECRET" | base64)

export TOKEN=$(curl -s -X POST "https://oauth2.$DOMAIN/oauth2/token" -H "Authorization: Basic $ENCODED_CREDENTIALS" -F "grant_type=client_credentials" -F "scope=read" | jq -r '.access_token')

curl -ik -X GET https://lottery-generator.$DOMAIN/ -H "Authorization: bearer $TOKEN"
curl -ik -X GET https://powerball-generator.$DOMAIN/ -H "Authorization: bearer $TOKEN"