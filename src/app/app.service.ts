import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AppService {
  private playerWhoWonSubject = new Subject<string | null>();
  private computerActionSubject = new Subject<string>();
  playerWhoWon$: Observable<string | null> = this.playerWhoWonSubject.asObservable();
  computerAction$: Observable<string> = this.computerActionSubject.asObservable();

  submitActions(player1Action: string, player2Action: string) {
    this.playerWhoWonSubject.next(this.determinePlayerWhoWon(player1Action, player2Action));
  }

  submitAction(player1Action: string) {
    let computerAction = this.getComputerAction();
    let playerId = this.determinePlayerWhoWon(player1Action, computerAction);

    this.computerActionSubject.next(computerAction);

    if (playerId === '2') {
      this.playerWhoWonSubject.next('Computer');
    } else {
      this.playerWhoWonSubject.next(playerId);
    }
  }

  private determinePlayerWhoWon(player1Action: string, player2Action: string) {
    if (player1Action === 'rock') {
      if (player2Action === 'rock') return null;
      else if (player2Action === 'paper') return '2';
      else if (player2Action === 'scissors') return '1';
    }
    else if (player1Action === 'paper') {
      if (player2Action === 'rock') return '1';
      else if (player2Action === 'paper') return null;
      else if (player2Action === 'scissors') return '2';
    }
    else if (player1Action === 'scissors') {
      if (player2Action === 'rock') return '2';
      else if (player2Action === 'paper') return '1';
      else if (player2Action === 'scissors') return null;
    }
  }

  private getComputerAction() {
    let actions = ['rock', 'paper', 'scissors'];
    return actions[Math.floor(Math.random() * 3)];
  }
}
