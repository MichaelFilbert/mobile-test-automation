import '../support/hooks.js';
import { expect } from '@wdio/globals';
import HomeScreen from '../screens/home.screen.js';

describe('Home', () => {
  it('shows the welcome content and all six navigation tabs', async () => {
    await HomeScreen.waitForDisplayed();
    await expect(HomeScreen.heading).toBeDisplayed();
    await expect(HomeScreen.tagline).toBeDisplayed();
    expect(await HomeScreen.visibleTabs()).toEqual(['Home', 'Webview', 'Login', 'Forms', 'Swipe', 'Drag']);
  });
});
