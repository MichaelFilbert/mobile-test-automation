export type Tab = 'Home' | 'Webview' | 'Login' | 'Forms' | 'Swipe' | 'Drag';

/** Shared helpers for every screen object. Locators prefer accessibility ids. */
export default class BaseScreen {
  constructor(protected readonly rootSelector: string) {}

  get root() {
    return $(this.rootSelector);
  }

  /** Taps a bottom tab and waits until this screen is on display. */
  protected async openTab(tab: Tab) {
    await $(`~${tab}`).click();
    await this.waitForDisplayed();
  }

  async waitForDisplayed(timeout = 15000) {
    await this.root.waitForDisplayed({ timeout });
  }

  /** Swipes using a W3C pointer action. Percentages are relative to the window size. */
  async swipe(opts: { fromX: number; fromY: number; toX: number; toY: number; durationMs?: number }) {
    const { width, height } = await driver.getWindowSize();
    const px = (p: number, size: number) => Math.round(size * p);
    await driver
      .action('pointer', { parameters: { pointerType: 'touch' } })
      .move({ x: px(opts.fromX, width), y: px(opts.fromY, height) })
      .down()
      .pause(100) // gesture timing inside one W3C action, not a test wait
      .move({ duration: opts.durationMs ?? 500, x: px(opts.toX, width), y: px(opts.toY, height) })
      .up()
      .perform();
  }

  /**
   * Scrolls down until the element is on screen. The swipe starts just above the tab bar:
   * on the Swipe screen the horizontal carousel swallows vertical drags that start on it,
   * and this strip below it is the one place a drag always reaches the ScrollView.
   */
  async scrollTo(element: ChainablePromiseElement, maxSwipes = 6) {
    for (let i = 0; i < maxSwipes; i++) {
      if (await element.isDisplayed()) return;
      await this.swipe({ fromX: 0.5, fromY: 0.885, toX: 0.5, toY: 0.25, durationMs: 600 });
    }
    await element.waitForDisplayed({ timeout: 3000, timeoutMsg: `Element not found after ${maxSwipes} swipes` });
  }
}
