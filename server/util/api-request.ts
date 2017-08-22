import { APIRequestObject } from './request-object';

let apiRequest = require('request');

export class APIRequest {

  get(reqObject: APIRequestObject, onDone: any) {
    //reqObject.rejectUnauthorized = false;
    apiRequest.get(reqObject, onDone);
  }

  post(reqObject: APIRequestObject, onDone: any) {
    //reqObject.rejectUnauthorized = false;
    apiRequest.post(reqObject, onDone);
  }

}

export default APIRequest;
