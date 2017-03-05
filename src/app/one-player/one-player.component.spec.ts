import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePlayerComponent } from './one-player.component';
import { AppService } from '../app.service';
import { Subject } from 'rxjs';
import { PlayerComponent } from '../player/player.component';

describe('OnePlayerComponent', () => {
  let component: OnePlayerComponent;
  let element: any;
  let fixture: ComponentFixture<OnePlayerComponent>;
  let mockAppService: AppService;

  let playerWhoWonSubject = new Subject<string>();
  let computerActionSubject = new Subject<string>();

  beforeEach(async(() => {
    mockAppService = jasmine.createSpyObj('fake App Service', ['submitAction']);
    mockAppService.playerWhoWon$ = playerWhoWonSubject.asObservable();
    mockAppService.computerAction$ = computerActionSubject.asObservable();

    TestBed.configureTestingModule({
      declarations: [ OnePlayerComponent, PlayerComponent ],
      providers: [
        { provide: AppService, useValue: mockAppService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePlayerComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display one player control when user chooses to play with computer', () => {
    expect(element.querySelectorAll('app-player').length).toEqual(1);
  });

  it('should call the service once human player makes an action', () => {
    element.querySelector('.rock').click();

    expect(mockAppService.submitAction).toHaveBeenCalledWith('rock');
  });

  describe('when the game ends', () => {
    it('should display which player won and a play again button when the service returns winning player name', () => {
      expect(element.querySelector('.player-won'))
        .toBeNull('Player won panel should not be present before game ends');

      playerWhoWonSubject.next('1');
      fixture.detectChanges();

      expect(element.querySelector('.player-won h2.message').textContent)
        .toEqual('Player 1 wins!', 'Winning player name should be present');
      expect(element.querySelector('.player-won button'))
        .not.toBeNull('Play again button should be present');
    });

    it('should also display computer\'s action when playing against a computer', () => {
      playerWhoWonSubject.next('1');
      computerActionSubject.next('rock');
      fixture.detectChanges();

      expect(element.querySelector('.computer-action').textContent)
        .toEqual('Computer chose rock', 'Computer\'s action should be present');
    });

    it('should reset the game when user chooses to play again', () => {
      element.querySelector('.rock').click();
      fixture.detectChanges();
      playerWhoWonSubject.next('1');
      fixture.detectChanges();
      element.querySelector('.player-won button').click();
      fixture.detectChanges();

      expect(element.querySelector('.player-won')).toBeNull('Player won panel should not be present');

      let buttonStates = Array.from(element.querySelectorAll('#game button'))
        .map((e: HTMLElement) => e.getAttribute('disabled'));

      expect(buttonStates).not.toContain(true, 'No action buttons should be disabled');
      expect(element.querySelectorAll('.btn-success').length)
        .toEqual(0, 'No action buttons should be in the selected state');
    });
  });
});
