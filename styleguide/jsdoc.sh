#!/usr/bin/env bash
set -e
shopt -s extglob
npm run jsdoc-documentation src/makeRoutes.js docs/js/makeRoutes.md
npm run jsdoc-documentation src/getPages.js docs/js/getPages.md
npm run jsdoc-documentation src/matchParamsPath.js docs/js/matchParamsPath.md
npm run jsdoc-documentation src/getRoutesMap.js docs/js/getRoutesMap.md

