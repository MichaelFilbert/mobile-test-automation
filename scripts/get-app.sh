#!/usr/bin/env bash
# Downloads the WebdriverIO native demo app (MIT) Android APK and checks its size and SHA-256.
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION="1.0.8"
FILE="android.wdio.native.app.v${VERSION}.apk"
URL="https://github.com/webdriverio/native-demo-app/releases/download/v${VERSION}/${FILE}"
EXPECTED_SIZE=29006429
EXPECTED_SHA256="916731e06fce5f8e5175149c44ebd3c06637c00ac6b5414fe746517a8609b2d4"
mkdir -p apps
if [ ! -f "apps/${FILE}" ]; then
  curl -fL --retry 3 -o "apps/${FILE}" "$URL"
fi
SIZE=$(wc -c < "apps/${FILE}" | tr -d ' ')
SHA=$( (sha256sum "apps/${FILE}" 2>/dev/null || shasum -a 256 "apps/${FILE}") | cut -d' ' -f1)
if [ "$SIZE" != "$EXPECTED_SIZE" ] || [ "$SHA" != "$EXPECTED_SHA256" ]; then
  echo "Checksum or size mismatch for ${FILE} (size $SIZE, sha $SHA)" >&2
  rm -f "apps/${FILE}"
  exit 1
fi
echo "OK apps/${FILE}"
