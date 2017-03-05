import { Component, EventEmitter, Output, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnChanges {
  @Input() playerName: string;
  @Input() reset: boolean;

  @Output() actionSelected = new EventEmitter<string>();

  private action: string | null;

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      if (propName == 'reset' &&
        changes[propName].previousValue == false &&
        changes[propName].currentValue == true
      ) {
        this.action = null;
      }
    }
  }

  chooseAction(action: string) {
    this.action = action;

    this.actionSelected.emit(this.action);
  }
}
