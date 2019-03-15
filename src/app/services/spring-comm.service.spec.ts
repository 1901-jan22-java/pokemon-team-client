import { TestBed } from '@angular/core/testing';

import { SpringCommService } from './spring-comm.service';

describe('SpringCommService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpringCommService = TestBed.get(SpringCommService);
    expect(service).toBeTruthy();
  });
});
