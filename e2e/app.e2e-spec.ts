import {AppPage} from './app.po';

describe('ngx-loader Demo', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    page.sync();
  });

  it('should add and remove beckdrop', () => {
    expect(page.getElementTag('ng-busy').isPresent()).toBe(true);
    expect(page.getElementTag('ng-busy-backdrop').isPresent()).toBe(false);
    page.getElementTag('input').click();
    expect(page.getElementTag('ng-busy-backdrop').isPresent()).toBe(true);
    page.getElementTag('input').click();
    expect(page.getElementTag('ng-busy-backdrop').isPresent()).toBe(false);
  });

  it('should change progress bar mode when active and when promise resolved', () => {
    const promiseButton = page.getButtonText('Call a subscription');
    page.waitMode('//mat-progress-bar[@mode="determinate"]');
    page.ignoreSync();
    promiseButton.click();
    page.waitMode('//mat-progress-bar[@mode="indeterminate"]');
    page.sleep(2000);
    page.waitMode('//mat-progress-bar[@mode="determinate"]');
  });

  it('should show backdrop when active and hide when promise resolved', () => {
    page.getElementTag('input').click();
    expect(page.getElementXpath('//ng-busy-backdrop/div').isPresent()).toBe(false);
    const promiseButton = page.getButtonText('Call a subscription');
    page.ignoreSync();
    promiseButton.click();
    page.sleep(500);
    expect(page.getElementXpath('//ng-busy-backdrop/div').isPresent()).toBe(true);
    expect(page.getElementXpath('//ng-busy-backdrop/div').getCssValue('opacity')).toBe('0.7');
    page.sleep(2000);
    expect(page.getElementXpath('//ng-busy-backdrop/div').isPresent()).toBe(false);
  });
});
