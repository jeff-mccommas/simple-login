import { TestBed, inject } from '@angular/core/testing';
import {Injectable, ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { Prek12Service } from './prek12.service';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
let SampleJWTResponse = {
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijc0NDYxMzU5In0.eyJzdWIiOiJVTklUQVMiLCJlaWQiOm51bGwsImlzcyI6Imh0dHBzOi8vaWRtLWRldi5taGVkdWNhdGlvbi5jb20iLCJ0b2tlbl90eXBlIjoiYmVhcmVyIiwiY2xpZW50X2lkIjoiVU5JVEFTIiwiYXVkIjoiVU5JVEFTIiwieGlkIjoiVU5JVEFTIiwic2NvcGUiOlsiZnVsbHVzZXIiLCJwcm92aXNpb25pbmciXSwiaWQiOiIxZmYzZTU0Yy01NWVjLTQzZDEtODc3Ny00MDY2Nzc3MGQxMzUiLCJleHAiOjE1MDQyNjA3MTAsImlhdCI6MTUwNDE3NDMxMCwianRpIjoiMWZmM2U1NGMtNTVlYy00M2QxLTg3NzctNDA2Njc3NzBkMTM1IiwiY2lkIjpudWxsfQ.Xs2nURWCk-M3zYUjBtQOaxH2PqGRTf8o8jqedYY5hEhWYfRpO4yTnX58BB4qIX4wo6CkDeoS1t6V0rlsJJd75WSk2obK2JxB8o9_sNKVF3uJHVvSRBnN2x56zfBpe4uFMeMPVnOrg7K9N2Z9gXcpc1dsFNrAYpBPIBWweI4h8ru4ju7-MpGQyPbz7yLuK0431uDGS3UqPNuCypbh9U_UdORckouqTsZUgbTMF-PjNdvOiMLAoSo1_0fVq6MP5SpKwK-fId8rpFC676elsf6wrz9hbZkXGt47nJKxMkJwMVZbPR53pQPG1d3OGwVqmo6xvcO9arGy923oEFyr90RQOQ",
  "token_type": "bearer",
  "expires_in": 86399,
  "scope": "fulluser provisioning"
};
let sampleStudentResponse = {
  "id": "123",
  "name": "Jeff",
  "image": "",
  "email": "test@test.test",
  "usr": "jeff11"
};
let sampleStudentFromIdResponse = { students: [{
  id: "123",
  name: "Jeff",
  image: "",
  email: "test@test.test",
  usr: "jeff11"
}]
};
describe('Prek12Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Prek12Service, {provide: Http, deps: [MockBackend]}]
    });
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      Prek12Service,
    ]);
    this.prek12Service = this.injector.get(Prek12Service);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });
  it('showJWT() should query current service url', () => {
    this.prek12Service.showJWT();
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/jwt$/, 'url invalid');
  });
  it('validateUser() should query current service url', () => {
    this.prek12Service.validateUser();
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/idmLogin$/, 'url invalid');
  });
  it('getStudentFromId() should query current service url', () => {
    this.prek12Service.getStudentFromId(1);
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/context\/1$/, 'url invalid');
  });
  it('getStudentsFromSectionId() should query current service url', () => {
    this.prek12Service.getStudentsFromSectionId(1);
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/context\/1$/, 'url invalid');
  });
  it('getSection() should query current service url', () => {
    this.prek12Service.getSection(1);
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/context\/1$/, 'url invalid');
  });
  it('showJWT() should return access token', fakeAsync(() => {
    let result: any;
    this.prek12Service.showJWT().then((jwtRes:any) => {
        result = JSON.parse(jwtRes._body);
    });
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(SampleJWTResponse),
    })));
    tick();
    expect(result.access_token).toBeDefined('should have access_token in jwt response');
  }));
  it('getStudentsFromSectionId() should return student', fakeAsync(() => {
    let result: any;
    this.prek12Service.getStudentsFromSectionId().then((student:any) => {
        result = JSON.parse(student._body);
    });
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(sampleStudentResponse),
    })));
    tick();
    expect(result.name).toMatch("Jeff", 'should have name as jeff in response');
  }));
  it('getStudentsFromSectionId() should return contextData if it is available', fakeAsync(() => {
    let result: any;
    this.prek12Service.contextData = {
      id: 1,
      image: "",
      name: "contextuser",
      students: []
    };
    this.prek12Service.getStudentsFromSectionId().then((student:any) => { 
        expect(student.name).toMatch("contextuser", 'should have name as contextuser response');
    });
  }));
  it('validateUser() should return access token', fakeAsync(() => {
    let result: any;
    this.prek12Service.validateUser().then((student:any) => {
        result = JSON.parse(student._body);
    });
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(SampleJWTResponse),
    })));
    tick();
    expect(result.access_token).toBeDefined('should have access_token in jwt response');
  }));
});
