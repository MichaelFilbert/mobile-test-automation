import fs from 'node:fs';
import path from 'node:path';
import { APP_ID, env } from '../../config/env.js';

/**
 * Root-level hooks, imported by every spec file. They run before any hook inside a
 * describe block, so each test starts from a freshly launched app on the Home screen.
 */
const screenshotDir = path.join(env.reportsDir, 'screenshots');

beforeEach(async () => {
  await driver.switchContext('NATIVE_APP').catch(() => undefined); // a failed web test may leave us in WEBVIEW
  await driver.terminateApp(APP_ID);
  await driver.activateApp(APP_ID);
  await $('~Home-screen').waitForDisplayed({ timeout: 30000 });
});

afterEach(async function () {
  if (this.currentTest?.state !== 'failed') return;
  fs.mkdirSync(screenshotDir, { recursive: true });
  const name = this.currentTest.fullTitle().replace(/[^a-z0-9]+/gi, '_').slice(0, 120);
  const file = path.join(screenshotDir, `${name}.png`);
  await driver.saveScreenshot(file); // visible in the CI artifact and next to the JUnit XML
  console.log(`[screenshot] ${file}`);
});
