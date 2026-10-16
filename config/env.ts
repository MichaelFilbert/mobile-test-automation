import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const APP_ID = 'com.wdiodemoapp';
export const APP_FILE = 'android.wdio.native.app.v1.0.8.apk';

/**
 * Everything that differs between a local arm64 emulator and the x86_64 emulator
 * in CI is read from environment variables, with local defaults.
 */
export const env = {
  appPath: process.env.APP_PATH ?? path.join(root, 'apps', APP_FILE),
  deviceName: process.env.ANDROID_DEVICE_NAME ?? 'Android Emulator',
  platformVersion: process.env.ANDROID_PLATFORM_VERSION, // e.g. 14; optional
  udid: process.env.ANDROID_UDID, // optional, needed only with several devices
  // Set APPIUM_AVD to let Appium boot that AVD itself (otherwise start one first).
  avd: process.env.APPIUM_AVD,
  appiumHome: process.env.APPIUM_HOME ?? path.join(root, '.appium'),
  reportsDir: path.join(root, 'reports'),
  isCI: process.env.CI === 'true',
};
