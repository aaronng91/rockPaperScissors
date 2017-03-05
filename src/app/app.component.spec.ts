import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let element: any;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should prompt user to choose to play against another player or computer', () => {
    expect(element.querySelector('h1').textContent).toEqual('Who would you like to play with?');
    expect(element.querySelector('button.player')).not.toBeNull();
    expect(element.querySelector('button.computer')).not.toBeNull();
  });

  it('should dismiss prompt after user choose who to play with', () => {
    element.querySelector('.player').click();
    fixture.detectChanges();

    expect(element.querySelector('#prompt')).toBeNull();
  });
});
