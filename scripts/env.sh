# Source this file: `source scripts/env.sh`
# Sets up Java and the Android SDK for this shell only. Nothing global is changed.
if [ "$(uname -s)" = "Darwin" ] && command -v brew >/dev/null 2>&1; then
  export JAVA_HOME="${JAVA_HOME:-$(brew --prefix openjdk@17)/libexec/openjdk.jdk/Contents/Home}"
fi
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
# Name of the local AVD used by scripts/start-emulator.sh
export AVD_NAME="${AVD_NAME:-wdio_pixel_34}"
