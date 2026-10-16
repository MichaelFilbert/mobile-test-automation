import BaseScreen from './base.screen.js';

class HomeScreen extends BaseScreen {
  constructor() {
    super('~Home-screen');
  }
  get heading() {
    return $('android=new UiSelector().text("WEBDRIVER")');
  }
  get tagline() {
    return $('android=new UiSelector().textContains("Demo app for the appium-boilerplate")');
  }
  open() {
    return this.openTab('Home');
  }
  /** Returns the names of the bottom tabs that are on display. */
  async visibleTabs() {
    const tabs = ['Home', 'Webview', 'Login', 'Forms', 'Swipe', 'Drag'];
    const shown: string[] = [];
    for (const t of tabs) if (await $(`~${t}`).isDisplayed()) shown.push(t);
    return shown;
  }
}
export default new HomeScreen();
