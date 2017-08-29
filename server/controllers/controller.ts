import * as express from 'express';
import { Request, Response } from 'express';
import path = require('path');
import * as ajaxRequest from 'request';

import * as jwt from 'jwt-simple';
import * as jwtDecode from 'jwt-decode';
import * as _ from 'lodash';
import * as querystring from 'querystring';
import { ControllerInterface } from './controller-interface';
import { APIRequest } from '../util/api-request';
import { HttpHandle } from '../util/http-handle';
import { ApplicationConfig as APP_CONFIG } from '../config/app_config';
import {UrlConfig} from '../config/client/url-config';
const allowAccessPath: string = path.join(__dirname + './../../client/index.html');
let errorObj: any={
  success: false,
  msg: ''
};
export class Controller implements ControllerInterface {
  public httpHandle:HttpHandle; 
  constructor(public apiRequest: APIRequest) {
      this.httpHandle = new HttpHandle(apiRequest);
  }
  // getSectionDetail(request: Request, response: Response): void {
  //     response.json(sections);
  // }
  // getStudentDetail(request: Request, response: Response): void {
  //     const section = sections.filter(x => x.id == request.params.sectionId)[0];
  //     response.json(section);
  // }
  // verifyAccessToken(token: string, response: Response): void {
  // if (!token) {
  //   return false;
  // } else {
  //   try {
  //     console.log('decoding token..', token);
  //     // TODO: Revert back to decode using secret once core fixes PC-1037
  //     // let decoded: any = jwt.decode(token, secret);
  //     let decoded: any = jwtDecode(token);
  //     console.log('JWT token decrypted succesfully');
  //     // set cookie in token on successful decode
  //     this.setCookieToken(token, response);
  //     return true;
  //   } catch (error) {
  //     // For error while decode
  //     console.error('Unable to decrypt the token:', token, error);
  //     return false;
  //   }
  // }
  // }
}

export default Controller;
