import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-two-player',
  templateUrl: './two-player.component.html',
  styleUrls: ['./two-player.component.css']
})
export class TwoPlayerComponent implements OnInit {
  player1Action: string | null;
  player2Action: string | null;
  playerWhoWon: string | null;

  gameEnded = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.playerWhoWon$.subscribe((playerName: string) => {
      this.playerWhoWon = playerName;
      this.gameEnded = true;
    });
  }

  submitPlayer1Action(action: string) {
    this.player1Action = action;

    if (this.player2Action) {
      this.appService.submitActions(this.player1Action, this.player2Action);
    }
  }

  submitPlayer2Action(action: string) {
    this.player2Action = action;

    if (this.player1Action) {
      this.appService.submitActions(this.player1Action, this.player2Action);
    }
  }

  get gameEndMessage() {
    if (this.playerWhoWon) {
      return `Player ${this.playerWhoWon} wins!`;
    } else {
      return 'It\'s a tie!';
    }
  }

  resetGame() {
    this.player1Action = null;
    this.player2Action = null;
    this.gameEnded = false;
  }
}
