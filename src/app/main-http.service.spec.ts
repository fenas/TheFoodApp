import { TestBed } from '@angular/core/testing';

import { MainHttpService } from './main-http.service';

describe('MainHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainHttpService = TestBed.get(MainHttpService);
    expect(service).toBeTruthy();
  });
});
