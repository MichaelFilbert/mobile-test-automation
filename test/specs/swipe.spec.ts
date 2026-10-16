import '../support/hooks.js';
import { expect } from '@wdio/globals';
import SwipeScreen from '../screens/swipe.screen.js';

describe('Swipe', () => {
  beforeEach(async () => {
    await SwipeScreen.open();
  });

  it('moves the carousel to the next card when swiping left', async () => {
    const second = 'GREAT COMMUNITY';
    expect(await SwipeScreen.titleX(second)).toBeGreaterThan(900); // starts off to the right
    await SwipeScreen.swipeCarouselLeft();
    await SwipeScreen.waitForCardInView(second);
  });

  it('moves back to the first card when swiping right again', async () => {
    await SwipeScreen.swipeCarouselLeft();
    await SwipeScreen.waitForCardInView('GREAT COMMUNITY');
    await SwipeScreen.swipeCarouselRight();
    await driver.waitUntil(async () => (await SwipeScreen.titleX('GREAT COMMUNITY')) > 900, {
      timeout: 10000,
      timeoutMsg: 'Carousel did not return to the first card',
    });
  });

  it('scrolls down to find the hidden WebdriverIO logo', async () => {
    await expect(SwipeScreen.logo).not.toBeDisplayed();
    await SwipeScreen.scrollTo(SwipeScreen.logo);
    await expect(SwipeScreen.logo).toBeDisplayed();
  });
});
