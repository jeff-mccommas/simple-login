import { TestBed, inject } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
  });

  it('LoggerService should defined', inject([LoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
  }));
  it('LoggerService should have method log', inject([LoggerService], (service: LoggerService) => {
    expect(service.log).toBeTruthy();
  }));
  it('LoggerService should array logs that take log values', inject([LoggerService], (service: LoggerService) => {
      service.log("Hello world")
      var expectedOutput = ["Hello world"];
      expect(service.logs.length).toBeGreaterThan(0);
  }));
});
