import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerComponent } from './player.component';
import { SimpleChange } from '@angular/core';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let element: any;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.playerName = '1';
    fixture.detectChanges();
  });

  it('should display player name', () => {
    expect(element.querySelector('.player-name').innerText)
      .toEqual(`Player ${component.playerName}`, 'Player name should be \'Player 1\'');
  });

  it('should allow player to select an action between rock, paper and scissors', () => {
    expect(element.querySelector('.rock')).not.toBeNull('Rock button should be present');
    expect(element.querySelector('.paper')).not.toBeNull('Paper button should be present');
    expect(element.querySelector('.scissors')).not.toBeNull('Scissors button should be present');
  });

  it('should emit an event when user chooses an action', done => {
    component.actionSelected.subscribe((action: string) => {
      expect(action).toEqual('rock', 'Action should be \'rock\'');
      done();
    });

    element.querySelector('.rock').click();
  });

  it('should disable other actions and highlight selected action when user chooses an action', () => {
    element.querySelector('.rock').click();
    fixture.detectChanges();

    expect(element.querySelector('.rock').disabled).toBeTruthy('Rock button should be disabled');
    expect(element.querySelector('.paper').disabled).toBeTruthy('Paper button should be disabled');
    expect(element.querySelector('.scissors').disabled).toBeTruthy('Scissors button should be disabled');

    expect(element.querySelector('.rock').className).toContain('btn-success', 'Rock button should be selected');
  });

  it('should re-enable other actions and un-highlight selected action when game resets', () => {
    component.ngOnChanges({'reset': {previousValue: false, currentValue: true} as SimpleChange});
    fixture.detectChanges();

    expect(element.querySelector('.rock').disabled).toBeFalsy('Rock button should be re-enabled');
    expect(element.querySelector('.paper').disabled).toBeFalsy('Paper button should be re-enabled');
    expect(element.querySelector('.scissors').disabled).toBeFalsy('Scissors button should be re-enabled');

    expect(element.querySelector('.rock').className).not.toContain('btn-success', 'Rock button should be un-highlighted');
  });
});
