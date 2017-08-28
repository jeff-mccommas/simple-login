import { inject } from '@angular/core/testing';
import { Headers, Http } from '@angular/http';
import { AppConfigService } from './app-config.service';
let http: Http;
let configService = new AppConfigService(http);

describe('AppConfigService Tests', () => {
  beforeEach(() => {
  });
    it(' should return a promise', function () {


    });

  it('should ...', inject([AppConfigService], (service: AppConfigService) => {
    expect(service).toBeTruthy();
  }));
});
