import * as express from 'express';
import { Request, Response } from 'express';

import * as _ from 'lodash';
import * as querystring from 'querystring';
import { APIRequest } from '../util/api-request';

export class HttpHandle {
  constructor(public apiRequest:APIRequest) {}
  fetchData(config: any,formData: any): Promise < any > {
    return new Promise((resolve, reject) => {
      let formDataStr = querystring.stringify(formData);
      //console.log(`formData is ${formData}`);
      let contentLength = formData.length;
      let headers:any = {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      if (config.simplifiedLogin) {
        //For simplified login no header required, Request fails if add any content-type header in form-data
        headers = {};
      }
      this.apiRequest.post({
        headers: headers,
        uri: config.uri,
        body: formDataStr,
        json: true
      }, (error, response, body) => {
        if (error) {
          reject({
            reject:true,
            res: error
          });
        } else if (response.statusCode === 200) {
          resolve({
            reject: false,
            res: response
          });
        } else {
          //In case of 400 statusCode it will go here
          //If we dont have this block then service will get stuck becuase no error and no 200
          reject({
            reject : true,
            res: response
          });
        }
      });
    });
  }
}

export default HttpHandle;
