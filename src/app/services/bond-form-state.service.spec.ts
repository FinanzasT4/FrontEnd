import { TestBed } from '@angular/core/testing';

import { BondFormStateService } from './bond-form-state.service';

describe('BondFormStateService', () => {
  let service: BondFormStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BondFormStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
