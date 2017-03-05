import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isTwoPlayers: boolean;
  gameModeSelected = false;

  startGameWithAnotherPlayer(choice: boolean) {
    this.gameModeSelected = true;
    this.isTwoPlayers = choice;
  }
}
