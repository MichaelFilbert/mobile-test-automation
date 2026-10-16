import BaseScreen from './base.screen.js';

class FormsScreen extends BaseScreen {
  constructor() {
    super('~Forms-screen');
  }
  get textInput() {
    return $('~text-input');
  }
  get textResult() {
    return $('~input-text-result');
  }
  get switchControl() {
    return $('~switch');
  }
  get switchLabel() {
    return $('~switch-text');
  }
  get dropdown() {
    return $('~Dropdown');
  }
  get activeButton() {
    return $('~button-Active');
  }
  get inactiveButton() {
    return $('~button-Inactive');
  }
  option(text: string) {
    return $(`android=new UiSelector().text("${text}")`);
  }
  get dropdownValue() {
    return $('~Dropdown').$('android.widget.EditText');
  }

  open() {
    return this.openTab('Forms');
  }

  async typeText(text: string) {
    await this.textInput.setValue(text);
    if (await driver.isKeyboardShown()) await driver.hideKeyboard();
  }

  async selectDropdown(text: string) {
    await this.dropdown.click();
    const item = this.option(text);
    await item.waitForDisplayed();
    await item.click();
  }
}
export default new FormsScreen();
