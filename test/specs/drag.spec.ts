import '../support/hooks.js';
import { expect } from '@wdio/globals';
import DragScreen from '../screens/drag.screen.js';

describe('Drag and drop', () => {
  beforeEach(async () => {
    await DragScreen.open();
  });

  it('completes the puzzle and shows the congratulations message', async () => {
    await DragScreen.completePuzzle();
    await expect(DragScreen.congratulations).toBeDisplayed();
  });

  it('resets the puzzle with the renew button', async () => {
    await DragScreen.dragToTarget('l1');
    await DragScreen.drag('l1').waitForDisplayed({ reverse: true });
    await DragScreen.renew.click();
    await expect(DragScreen.drag('l1')).toBeDisplayed();
  });
});
