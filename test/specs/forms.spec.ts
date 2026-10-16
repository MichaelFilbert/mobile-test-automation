import '../support/hooks.js';
import { expect } from '@wdio/globals';
import Alert from '../screens/alert.component.js';
import FormsScreen from '../screens/forms.screen.js';

describe('Forms', () => {
  beforeEach(async () => {
    await FormsScreen.open();
  });

  it('echoes the text typed into the input field', async () => {
    await FormsScreen.typeText('Hello Appium');
    await expect(FormsScreen.textResult).toHaveText('Hello Appium');
  });

  it('toggles the switch on and off', async () => {
    await expect(FormsScreen.switchLabel).toHaveText('Click to turn the switch ON');
    await FormsScreen.switchControl.click();
    await expect(FormsScreen.switchLabel).toHaveText('Click to turn the switch OFF');
    await FormsScreen.switchControl.click();
    await expect(FormsScreen.switchLabel).toHaveText('Click to turn the switch ON');
  });

  it('selects an item from the dropdown', async () => {
    await FormsScreen.selectDropdown('webdriver.io is awesome');
    await expect(FormsScreen.dropdownValue).toHaveText('webdriver.io is awesome');
  });

  it('shows an alert when the active button is tapped', async () => {
    await FormsScreen.scrollTo(FormsScreen.activeButton);
    await FormsScreen.activeButton.click();
    expect(await Alert.getText()).toEqual({ title: 'This button is', message: 'This button is active' });
    await Alert.dismiss();
  });

  it('does not show an alert when the inactive button is tapped', async () => {
    await FormsScreen.scrollTo(FormsScreen.inactiveButton);
    await FormsScreen.inactiveButton.click();
    await expect(Alert.title).not.toBeDisplayed();
  });
});
