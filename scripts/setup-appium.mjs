// Installs the UiAutomator2 driver into a project-local APPIUM_HOME (.appium).
// Appium 3 keeps drivers in its own home directory, so a plain npm dependency is not enough.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const home = resolve('.appium');
if (existsSync(join(home, 'node_modules', 'appium-uiautomator2-driver'))) {
  console.log('uiautomator2 driver already installed');
  process.exit(0);
}
const bin = resolve('node_modules', '.bin', process.platform === 'win32' ? 'appium.cmd' : 'appium');
const res = spawnSync(bin, ['driver', 'install', '--source=npm', 'appium-uiautomator2-driver'], {
  stdio: 'inherit',
  env: { ...process.env, APPIUM_HOME: home },
  shell: process.platform === 'win32',
});
process.exit(res.status ?? 1);
