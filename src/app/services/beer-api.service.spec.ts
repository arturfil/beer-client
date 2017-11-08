import { TestBed, inject } from '@angular/core/testing';

import { BeerApiService } from './beer-api.service';

describe('BeerApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeerApiService]
    });
  });

  it('should be created', inject([BeerApiService], (service: BeerApiService) => {
    expect(service).toBeTruthy();
  }));
});
