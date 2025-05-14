import { TestBed } from '@angular/core/testing';

import { StationCodeService } from './station-code.service';

describe('StationCodeService', () => {
  let service: StationCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
