/** The native Android alert dialog used by several screens. */
class AlertComponent {
  get title() {
    return $('id=android:id/alertTitle');
  }
  get message() {
    return $('id=android:id/message');
  }
  get okButton() {
    return $('id=android:id/button1');
  }

  async waitForDisplayed() {
    await this.title.waitForDisplayed({ timeout: 10000 });
  }

  async getText() {
    await this.waitForDisplayed();
    return { title: await this.title.getText(), message: await this.message.getText() };
  }

  async dismiss() {
    await this.okButton.click();
    await this.title.waitForDisplayed({ reverse: true, timeout: 10000 });
  }
}

export default new AlertComponent();
