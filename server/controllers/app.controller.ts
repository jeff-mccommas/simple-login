import * as express from 'express';
import { Request, Response } from 'express';
import path = require('path');
import { APIRequest } from '../util/api-request';
import { ApplicationConfig as APP_CONFIG } from '../config/app_config';
import {UrlConfig} from '../config/client/url-config';
import { ControllerInterface } from './controller-interface';
const allowAccessPath: string = path.join(__dirname + './../../client/index.html');

export class AppController implements ControllerInterface {
  constructor(public apiRequest: APIRequest) {}
  validateContext(request: Request, response: Response): void {
    const redirectPath =  `/prek12/context/${request.query.clid}/students`;
    console.log(`Inside validatecontext and RP is ${redirectPath}`);
    response.redirect(redirectPath);
  }
  getURLConfig(request: Request, response: Response): void {
    const config: any = new UrlConfig().getConfig();
    response.json(config);
  }
  allowAccess(response: Response): void {
    console.log('Controller : allowAccess');
    return response.status(200).sendFile(allowAccessPath, {
      headers: {
        'X-Powered-By': 'local'
      }
    });
  }
  validateIP(request: Request, response: Response): void {
    return this.allowAccess(response);
  }
}

export default AppController;
