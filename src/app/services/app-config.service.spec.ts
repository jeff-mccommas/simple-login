import { TestBed, inject } from '@angular/core/testing';
import { AppConfigService } from './app-config.service';
import {Injectable, ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
let SampleJWTResponse = {
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijc0NDYxMzU5In0.eyJzdWIiOiJVTklUQVMiLCJlaWQiOm51bGwsImlzcyI6Imh0dHBzOi8vaWRtLWRldi5taGVkdWNhdGlvbi5jb20iLCJ0b2tlbl90eXBlIjoiYmVhcmVyIiwiY2xpZW50X2lkIjoiVU5JVEFTIiwiYXVkIjoiVU5JVEFTIiwieGlkIjoiVU5JVEFTIiwic2NvcGUiOlsiZnVsbHVzZXIiLCJwcm92aXNpb25pbmciXSwiaWQiOiIxZmYzZTU0Yy01NWVjLTQzZDEtODc3Ny00MDY2Nzc3MGQxMzUiLCJleHAiOjE1MDQyNjA3MTAsImlhdCI6MTUwNDE3NDMxMCwianRpIjoiMWZmM2U1NGMtNTVlYy00M2QxLTg3NzctNDA2Njc3NzBkMTM1IiwiY2lkIjpudWxsfQ.Xs2nURWCk-M3zYUjBtQOaxH2PqGRTf8o8jqedYY5hEhWYfRpO4yTnX58BB4qIX4wo6CkDeoS1t6V0rlsJJd75WSk2obK2JxB8o9_sNKVF3uJHVvSRBnN2x56zfBpe4uFMeMPVnOrg7K9N2Z9gXcpc1dsFNrAYpBPIBWweI4h8ru4ju7-MpGQyPbz7yLuK0431uDGS3UqPNuCypbh9U_UdORckouqTsZUgbTMF-PjNdvOiMLAoSo1_0fVq6MP5SpKwK-fId8rpFC676elsf6wrz9hbZkXGt47nJKxMkJwMVZbPR53pQPG1d3OGwVqmo6xvcO9arGy923oEFyr90RQOQ",
  "token_type": "bearer",
  "expires_in": 86399,
  "scope": "fulluser provisioning"
};
describe('AppConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppConfigService, {provide: Http, deps: [MockBackend]}]
    });
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      AppConfigService,
    ]);
    this.appConfigService = this.injector.get(AppConfigService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });
  it('load() should query current service url', () => {
    this.appConfigService.load();
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/urlconfig$/, 'url invalid');
  });
  it('AppConfigService should be created', inject([AppConfigService], (service: AppConfigService) => {
    expect(service).toBeTruthy();
  }));
  it('AppConfigService should have method getConfig', inject([AppConfigService], (service: AppConfigService) => {
    expect(service.getConfig).toBeTruthy();
  }));
  it('AppConfigService should have method load', inject([AppConfigService], (service: AppConfigService) => {
    expect(service.load).toBeTruthy();
  }));
});
