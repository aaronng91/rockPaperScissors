import { RockPaperScissorsPage } from './app.po';

describe('rock-paper-scissors App', () => {
  let page: RockPaperScissorsPage;

  beforeEach(() => {
    page = new RockPaperScissorsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
