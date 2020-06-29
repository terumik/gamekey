import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamekeyComponent } from './gamekey.component';

describe('GamekeyComponent', () => {
  let component: GamekeyComponent;
  let fixture: ComponentFixture<GamekeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamekeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamekeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
