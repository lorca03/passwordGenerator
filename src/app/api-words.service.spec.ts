import { TestBed } from '@angular/core/testing';

import { ApiWordsService } from './api-words.service';

describe('ApiWordsService', () => {
  let service: ApiWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
