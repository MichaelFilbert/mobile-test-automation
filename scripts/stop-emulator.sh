#!/usr/bin/env bash
cd "$(dirname "$0")/.."
source scripts/env.sh
adb emu kill 2>/dev/null || true
