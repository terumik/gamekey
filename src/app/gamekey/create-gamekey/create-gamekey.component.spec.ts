import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGamekeyComponent } from './create-gamekey.component';

describe('CreateGamekeyComponent', () => {
  let component: CreateGamekeyComponent;
  let fixture: ComponentFixture<CreateGamekeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGamekeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGamekeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
