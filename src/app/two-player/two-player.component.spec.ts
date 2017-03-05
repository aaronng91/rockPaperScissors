import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoPlayerComponent } from './two-player.component';
import { Subject } from 'rxjs';
import { AppService } from '../app.service';
import { PlayerComponent } from '../player/player.component';

describe('TwoPlayerComponent', () => {
  let component: TwoPlayerComponent;
  let element: any;
  let fixture: ComponentFixture<TwoPlayerComponent>;
  let mockAppService: AppService;

  let playerWhoWonSubject = new Subject<string>();

  beforeEach(async(() => {
    mockAppService = jasmine.createSpyObj('fake App Service', ['submitActions']);
    mockAppService.playerWhoWon$ = playerWhoWonSubject.asObservable();

    TestBed.configureTestingModule({
      declarations: [ TwoPlayerComponent, PlayerComponent ],
      providers: [
        { provide: AppService, useValue: mockAppService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoPlayerComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display two player controls when user chooses to play with another player', () => {
    expect(element.querySelectorAll('app-player').length).toEqual(2);
  });

  it('should only call the service after both human players make their actions', () => {
    element.querySelectorAll('.rock')[0].click();

    expect(mockAppService.submitActions).not.toHaveBeenCalled();

    element.querySelectorAll('.scissors')[1].click();

    expect(mockAppService.submitActions).toHaveBeenCalledWith('rock', 'scissors');
  });

  describe('when the game ends', () => {
    it('should display which player won and a play again button when the service returns winning player name', () => {
      expect(element.querySelector('.player-won')).toBeNull('Player won panel should not be present before game ends');

      playerWhoWonSubject.next('1');
      fixture.detectChanges();

      expect(element.querySelector('.player-won h2.message').textContent).toEqual('Player 1 wins!', 'Winning player name should be present');
      expect(element.querySelector('.player-won button')).not.toBeNull('Play again button should be present');
    });

    it('should reset the game when user chooses to play again', () => {
      element.querySelectorAll('.rock')[0].click();
      fixture.detectChanges();
      element.querySelectorAll('.scissors')[1].click();
      fixture.detectChanges();
      playerWhoWonSubject.next('1');
      fixture.detectChanges();
      element.querySelector('.player-won button').click();
      fixture.detectChanges();

      expect(element.querySelector('.player-won')).toBeNull('Player won panel should not be present');

      let buttonStates = Array.from(element.querySelectorAll('#game button'))
        .map((e: HTMLElement) => e.getAttribute('disabled'));

      expect(buttonStates).not.toContain(true, 'No action buttons should be disabled');
      expect(element.querySelectorAll('.btn-success').length).toEqual(0, 'No action buttons should be in the selected state');
    });
  });
});
