#!/bin/bash

curl "http://localhost:4741/plants/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}" \

echo
