import { TestBed } from '@angular/core/testing';

import { RkmProfileImageService } from './rkm-profile-image.service';

describe('RkmProfileImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RkmProfileImageService = TestBed.get(RkmProfileImageService);
    expect(service).toBeTruthy();
  });
});
