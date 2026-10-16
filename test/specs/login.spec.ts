import '../support/hooks.js';
import { expect } from '@wdio/globals';
import Alert from '../screens/alert.component.js';
import LoginScreen from '../screens/login.screen.js';

describe('Login', () => {
  beforeEach(async () => {
    await LoginScreen.open();
  });

  it('logs in with a valid email and password and shows a success alert', async () => {
    await LoginScreen.login('test@webdriver.io', 'Test1234!');
    expect(await Alert.getText()).toEqual({ title: 'Success', message: 'You are logged in!' });
    await Alert.dismiss();
  });

  it('rejects an invalid email address', async () => {
    await LoginScreen.login('not-an-email', 'Test1234!');
    await expect(LoginScreen.errorText('Please enter a valid email address')).toBeDisplayed();
    await expect(Alert.title).not.toBeDisplayed();
  });

  it('rejects a password shorter than 8 characters', async () => {
    await LoginScreen.login('test@webdriver.io', 'short');
    await expect(LoginScreen.errorText('Please enter at least 8 characters')).toBeDisplayed();
    await expect(Alert.title).not.toBeDisplayed();
  });
});

describe('Sign up', () => {
  beforeEach(async () => {
    await LoginScreen.open();
  });

  it('shows an error when the passwords do not match', async () => {
    await LoginScreen.signUp('test@webdriver.io', 'Test1234!', 'Different1!');
    await expect(LoginScreen.errorText('Please enter the same password')).toBeDisplayed();
    await expect(Alert.title).not.toBeDisplayed();
  });

  it('signs up with valid details and shows a success alert', async () => {
    await LoginScreen.signUp('new.user@webdriver.io', 'Test1234!', 'Test1234!');
    expect(await Alert.getText()).toEqual({ title: 'Signed Up!', message: 'You successfully signed up!' });
    await Alert.dismiss();
  });
});
