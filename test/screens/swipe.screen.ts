import BaseScreen from './base.screen.js';

class SwipeScreen extends BaseScreen {
  constructor() {
    super('~Swipe-screen');
  }
  get carousel() {
    return $('~Carousel');
  }
  get logo() {
    return $('~WebdriverIO logo');
  }
  /** Title of a carousel card, found by its text. */
  cardTitle(text: string) {
    return $(`android=new UiSelector().text("${text}")`);
  }

  open() {
    return this.openTab('Swipe');
  }

  async swipeCarouselLeft() {
    await this.swipe({ fromX: 0.8, fromY: 0.6, toX: 0.15, toY: 0.6, durationMs: 400 });
  }

  async swipeCarouselRight() {
    await this.swipe({ fromX: 0.15, fromY: 0.6, toX: 0.8, toY: 0.6, durationMs: 400 });
  }

  /** The horizontal position of a card title. It shrinks as the card moves into view. */
  async titleX(text: string) {
    return (await this.cardTitle(text).getLocation()).x;
  }

  /** Waits until the card title is fully in view (it starts at the left edge of the screen). */
  async waitForCardInView(text: string) {
    await driver.waitUntil(async () => (await this.titleX(text)) < 300, {
      timeout: 10000,
      timeoutMsg: `Carousel card "${text}" never moved into view`,
    });
  }
}
export default new SwipeScreen();
