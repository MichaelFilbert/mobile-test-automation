import '../support/hooks.js';
import { expect } from '@wdio/globals';
import WebviewScreen from '../screens/webview.screen.js';

describe('WebView (hybrid context switching)', () => {
  it('switches into the WEBVIEW context, reads the page, and switches back', async () => {
    await WebviewScreen.open();
    expect(await driver.getContext()).toBe('NATIVE_APP');

    const webview = await WebviewScreen.switchToWebview();
    expect(await driver.getContext()).toBe(webview);

    // Inside the web context the normal web locators and APIs work.
    const nav = $('nav');
    await nav.waitForExist({ timeout: 30000 });
    await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'));

    await WebviewScreen.switchToNative();
    expect(await driver.getContext()).toBe('NATIVE_APP');
    await expect(WebviewScreen.root).toBeDisplayed();
  });
});
