import { TestBed } from '@angular/core/testing';

import { GamekeyService } from './gamekey.service';

describe('GamekeyService', () => {
  let service: GamekeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamekeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
