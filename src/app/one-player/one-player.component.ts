import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-one-player',
  templateUrl: './one-player.component.html',
  styleUrls: ['./one-player.component.css']
})
export class OnePlayerComponent implements OnInit {
  player1Action: string | null;
  playerWhoWon: string | null;
  computerAction: string;

  gameEnded = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.playerWhoWon$.subscribe((playerName: string) => {
      this.playerWhoWon = playerName;
      this.gameEnded = true;
    });

    this.appService.computerAction$.subscribe((action: string) => {
      this.computerAction = action;
    });
  }

  submitPlayer1Action(action: string) {
    this.player1Action = action;
    this.appService.submitAction(this.player1Action);
  }

  get gameEndMessage() {
    if (this.playerWhoWon === 'Computer') {
      return 'Computer wins!';
    } else if (this.playerWhoWon) {
      return `Player ${this.playerWhoWon} wins!`;
    } else {
      return 'It\'s a tie!';
    }
  }

  resetGame() {
    this.player1Action = null;
    this.gameEnded = false;
  }
}
