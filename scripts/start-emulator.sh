#!/usr/bin/env bash
# Boots the local AVD headless-friendly and waits until Android has finished booting.
set -euo pipefail
cd "$(dirname "$0")/.."
source scripts/env.sh
if adb devices | grep -q "emulator-"; then echo "Emulator already running"; exit 0; fi
nohup emulator -avd "$AVD_NAME" -no-snapshot -no-audio -no-boot-anim ${EMULATOR_FLAGS:-} >/tmp/emulator.log 2>&1 &
adb wait-for-device
until [ "$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; do sleep 2; done
adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0
echo "Emulator ready"
