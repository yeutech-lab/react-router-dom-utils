#!/usr/bin/env bash
set -e
shopt -s extglob
npm run jsdoc-documentation 'src/**.js' docs/js/jsdoc.md

