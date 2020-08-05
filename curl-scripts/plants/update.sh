#!/bin/bash

curl "http://localhost:4741/plants/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "plant": {
      "name": "'"${NAME}"'",
      "scientificName": "'"${SCIENTIFICNAME}"'",
      "type": "'"${TYPE}"'",
      "soil": "'"${SOIL}"'",
      "sunlight": "'"${SUNLIGHT}"'",
      "water": "'"${WATER}"'"
    }
  }'

echo
