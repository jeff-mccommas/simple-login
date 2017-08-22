import { SimplifiedLoginPage } from './app.po';

describe('simplified-login App', () => {
  let page: SimplifiedLoginPage;

  beforeEach(() => {
    page = new SimplifiedLoginPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
