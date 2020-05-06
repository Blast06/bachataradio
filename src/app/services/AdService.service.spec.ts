/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdServiceService } from './AdService.service';

describe('Service: AdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdServiceService]
    });
  });

  it('should ...', inject([AdServiceService], (service: AdServiceService) => {
    expect(service).toBeTruthy();
  }));
});
