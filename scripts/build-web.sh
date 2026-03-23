#!/usr/bin/env bash
set -euo pipefail
# Web 静态导出：产物在 dist/，可部署到任意静态托管
exec npx expo export --platform web "$@"
