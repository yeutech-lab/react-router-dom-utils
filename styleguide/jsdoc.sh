#!/usr/bin/env bash
set -e
shopt -s extglob
npm run jsdoc-documentation src/makeRoutes.js docs/js/makeRoutes.md
npm run jsdoc-documentation src/getPages.js docs/js/getPages.md

