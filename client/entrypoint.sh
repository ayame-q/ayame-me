#!/bin/sh

if "$DEBUG"; then
  exec npm run dev
else
  exec "$@"
fi
