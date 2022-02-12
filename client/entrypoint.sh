#!/bin/sh

npm install -g npm && npm install;

if "$DEBUG"; then
  exec npm run dev
else
  exec "$@"
fi
