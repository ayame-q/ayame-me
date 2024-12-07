#!/bin/sh

yarn install;

if "$DEBUG"; then
  exec yarn run dev
else
  exec "$@"
fi
