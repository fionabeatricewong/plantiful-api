#!/bin/sh

curl "http://localhost:4741/plants/${ID}" \
  --include \
  --request GET \

echo
