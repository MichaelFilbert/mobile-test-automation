import path from 'node:path';
import type { Options } from '@wdio/types';
import { APP_ID, env } from './config/env.js';

// Appium 3 reads installed drivers from APPIUM_HOME (see scripts/setup-appium.mjs).
process.env.APPIUM_HOME = env.appiumHome;

export const config: Options.Testrunner & { capabilities: WebdriverIO.Capabilities[] } = {
  runner: 'local',
  specs: ['./test/specs/**/*.spec.ts'],
  maxInstances: 1, // one emulator, one session

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': env.deviceName,
      ...(env.platformVersion && { 'appium:platformVersion': env.platformVersion }),
      ...(env.udid && { 'appium:udid': env.udid }),
      ...(env.avd && { 'appium:avd': env.avd, 'appium:avdLaunchTimeout': 240000 }),
      'appium:app': env.appPath,
      'appium:appPackage': APP_ID,
      'appium:appWaitActivity': '*',
      'appium:autoGrantPermissions': true,
      'appium:noReset': true, // the suite resets app state itself in beforeTest
      'appium:newCommandTimeout': 240,
      'appium:adbExecTimeout': 60000,
      'appium:uiautomator2ServerLaunchTimeout': 90000,
      'appium:uiautomator2ServerInstallTimeout': 90000,
    },
  ],

  services: [
    [
      'appium',
      {
        args: { address: '127.0.0.1', port: 4723, relaxedSecurity: true },
        logPath: env.reportsDir,
      },
    ],
  ],
  port: 4723,
  hostname: '127.0.0.1',

  logLevel: 'warn',
  waitforTimeout: 15000,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 2,

  framework: 'mocha',
  mochaOpts: { ui: 'bdd', timeout: 120000 },

  reporters: [
    'spec',
    ['junit', { outputDir: path.join(env.reportsDir, 'junit'), outputFileFormat: (options) => `results-${options.cid}.xml` }],
  ],
};
