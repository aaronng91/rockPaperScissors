import { RockPaperScissorsPage } from './app.po';

describe('rock-paper-scissors App', () => {
  let page: RockPaperScissorsPage;

  beforeEach(() => {
    page = new RockPaperScissorsPage();
    page.navigateTo();
  });

  it('should allow player to play with another player', () => {
    page.chooseAnotherPlayer();

    page.choosePlayer1Action('Rock');
    page.choosePlayer2Action('Paper');

    expect(page.getPlayerWonMessage().getText()).toEqual('Player 2 wins!');
  });

  it('should allow player to play with computer', () => {
    page.chooseComputer();

    page.choosePlayer1Action('Rock');

    expect(page.getPlayerWonMessage().isPresent()).toBeTruthy();
  });

  it('should allow player to play more than once', () => {
    page.chooseAnotherPlayer();
    page.choosePlayer1Action('Rock');
    page.choosePlayer2Action('Paper');

    page.choosePlayAgain();
    expect(page.getPlayerWonMessage().isPresent()).toBeFalsy();

    page.choosePlayer1Action('Scissors');
    page.choosePlayer2Action('Paper');

    expect(page.getPlayerWonMessage().getText()).toEqual('Player 1 wins!');
  });
});
