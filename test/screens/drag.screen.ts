import BaseScreen from './base.screen.js';

const CELLS = ['l1', 'c1', 'r1', 'l2', 'c2', 'r2', 'l3', 'c3', 'r3'] as const;

class DragScreen extends BaseScreen {
  constructor() {
    super('~Drag-drop-screen');
  }
  cells = CELLS;
  get renew() {
    return $('~renew');
  }
  drag(cell: string) {
    return $(`~drag-${cell}`);
  }
  drop(cell: string) {
    return $(`~drop-${cell}`);
  }
  get congratulations() {
    return $('android=new UiSelector().textContains("Congratulations")');
  }
  get retryButton() {
    return $('~button-Retry');
  }

  open() {
    return this.openTab('Drag');
  }

  /** Drags one piece onto the target cell with the same name (drag-l1 goes onto drop-l1). */
  async dragToTarget(cell: string) {
    const source = this.drag(cell);
    const target = this.drop(cell);
    await source.waitForDisplayed();
    const s = await source.getLocation();
    const sz = await source.getSize();
    const t = await target.getLocation();
    const tz = await target.getSize();
    await driver
      .action('pointer', { parameters: { pointerType: 'touch' } })
      .move({ x: Math.round(s.x + sz.width / 2), y: Math.round(s.y + sz.height / 2) })
      .down()
      .pause(200) // lets the app register a long press before the move
      .move({ duration: 600, x: Math.round(t.x + tz.width / 2), y: Math.round(t.y + tz.height / 2) })
      .up()
      .perform();
  }

  async completePuzzle() {
    for (const cell of this.cells) {
      await this.dragToTarget(cell);
      // The piece disappears from the tray once it is placed.
      await this.drag(cell).waitForDisplayed({ reverse: true, timeout: 10000 });
    }
  }
}
export default new DragScreen();
