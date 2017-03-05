import { browser, element, by } from 'protractor';

export class RockPaperScissorsPage {
  navigateTo() {
    return browser.get('/');
  }

  chooseAnotherPlayer() {
    return element(by.buttonText('Another player')).click();
  }

  chooseComputer() {
    return element(by.buttonText('Computer')).click();
  }

  choosePlayer1Action( action: string ) {
    return element.all(by.buttonText(action)).first().click();
  }

  choosePlayer2Action( action: string ) {
    return element.all(by.buttonText(action)).get(1).click();
  }

  choosePlayAgain() {
    return element(by.buttonText('Play again')).click();
  }

  getPlayerWonMessage() {
    return element(by.css('.player-won .message'));
  }
}
