import {browser, by, element, protractor} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getElementTag(value: string) {
    return element(by.tagName(value));
  }

  waitMode(value: string, time: number = 5000) {
    const EC = protractor.ExpectedConditions;
    return browser.wait(EC.presenceOf(element(by.xpath(value))), time)
  }

  ignoreSync() {
    browser.ignoreSynchronization = true;
  }

  sync() {
    browser.ignoreSynchronization = false;
  }

  getButtonText(value:string) {
    return element(by.buttonText(value));
  }

  getElementXpath(value:string) {
    return element(by.xpath(value));

  }

  sleep(value: number = 1000) {
    browser.sleep(value);
  }
}
