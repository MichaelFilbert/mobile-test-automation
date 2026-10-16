import BaseScreen from './base.screen.js';

class WebviewScreen extends BaseScreen {
  constructor() {
    super('android=new UiSelector().className("android.webkit.WebView").instance(0)');
  }

  open() {
    return this.openTab('Webview');
  }

  /** Waits for a WEBVIEW context to show up and switches to it. Returns its name. */
  async switchToWebview() {
    let name = '';
    await driver.waitUntil(
      async () => {
        const contexts = (await driver.getContexts()) as unknown as Array<string | { id: string }>;
        const ids = contexts.map((c) => (typeof c === 'string' ? c : c.id));
        name = ids.find((id) => id.startsWith('WEBVIEW')) ?? '';
        return name !== '';
      },
      { timeout: 20000, timeoutMsg: 'No WEBVIEW context appeared' },
    );
    await driver.switchContext(name);
    return name;
  }

  async switchToNative() {
    await driver.switchContext('NATIVE_APP');
  }
}
export default new WebviewScreen();
