import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamekeyListComponent } from './gamekey-list.component';

describe('GamekeyListComponent', () => {
  let component: GamekeyListComponent;
  let fixture: ComponentFixture<GamekeyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamekeyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamekeyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
