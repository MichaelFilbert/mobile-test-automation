import BaseScreen from './base.screen.js';

class LoginScreen extends BaseScreen {
  constructor() {
    super('~Login-screen');
  }
  get loginTab() {
    return $('~button-login-container');
  }
  get signUpTab() {
    return $('~button-sign-up-container');
  }
  get email() {
    return $('~input-email');
  }
  get password() {
    return $('~input-password');
  }
  get repeatPassword() {
    return $('~input-repeat-password');
  }
  get loginButton() {
    return $('~button-LOGIN');
  }
  get signUpButton() {
    return $('~button-SIGN UP');
  }
  // Validation messages are plain text views without an accessibility id.
  errorText(text: string) {
    return $(`android=new UiSelector().textContains("${text}")`);
  }

  open() {
    return this.openTab('Login');
  }

  async showSignUp() {
    await this.signUpTab.click();
    await this.repeatPassword.waitForDisplayed();
  }

  async fill(field: ChainablePromiseElement, value: string) {
    await field.waitForDisplayed();
    await field.setValue(value);
    // Close the keyboard so it does not cover the buttons below.
    if (await driver.isKeyboardShown()) await driver.hideKeyboard();
  }

  async login(email: string, password: string) {
    await this.fill(this.email, email);
    await this.fill(this.password, password);
    await this.loginButton.click();
  }

  async signUp(email: string, password: string, repeat: string) {
    await this.showSignUp();
    await this.fill(this.email, email);
    await this.fill(this.password, password);
    await this.fill(this.repeatPassword, repeat);
    await this.signUpButton.click();
  }
}
export default new LoginScreen();
