import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService]
    });

    service = TestBed.get(AppService);
  });

  it('should return player who won when both player actions are submitted', done => {
    service.playerWhoWon$.subscribe((playerName: string) => {
      expect(playerName).toEqual('2');
      done();
    });

    service.submitActions('rock', 'paper');
  });

  it('should return whether player or computer won when single player action is submitted', done => {
    service.playerWhoWon$.subscribe((playerName: string) => {
      expect(playerName).toMatch(/1|Computer$/);
      done();
    });

    service.submitAction('rock');
  });

  it('should return computer\'s action when single player action is submitted', done => {
    service.computerAction$.subscribe((action: string) => {
      expect(action).toMatch(/rock|paper|scissors$/);
      done();
    });

    service.submitAction('rock');
  });
});
