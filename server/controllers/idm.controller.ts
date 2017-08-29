import * as express from 'express';
import { Request, Response } from 'express';
import { APIRequest } from '../util/api-request';
import { HttpHandle } from '../util/http-handle';
import { ApplicationConfig as APP_CONFIG } from '../config/app_config';
let errorObj: any={
  success: false,
  msg: ''
};
import { ControllerInterface } from './controller-interface';
export class IdmController implements ControllerInterface {
  public httpHandle:HttpHandle; 
  constructor(public apiRequest: APIRequest) {
    this.httpHandle = new HttpHandle(apiRequest);
  }
  setCookieToken(token: string, response: Response) {
    response.cookie('_token', token);
  }
  async getIdmAccessToken(request: Request, response: Response): Promise <any> {
    try {
      //All parameters required for simplified login
      const jwtFormData = {
          client_id: APP_CONFIG.CLIENT_ID,
          client_secret: APP_CONFIG.CLIENT_SECRET,
          grant_type: APP_CONFIG.GRANT_TYPE_PASSWORD,
          scope: APP_CONFIG.SCOPE_AUTH,
          username: request.body.username, //Getting username from request body
          password: request.body.password, //Getting password from request body
          simplifiedLogin: true
        },
        jwtConfig = {
          uri: APP_CONFIG.IDM_JWT_URL,
          rejectMsg: 'Unable to fetch IDM access token'
        };
      const data = await this.httpHandle.fetchData(jwtConfig, jwtFormData);
      return data;
    } catch (err) {
      console.log("Error in getIdmAccessToken call :: "+ err);
      // Inside catch block here if its error 500 please redirect to error pafe
      return err;
    }
  }
  getIdmData(request: Request, response: Response) {
    console.log('Inside getIdmData');
    this.getIdmAccessToken(request, response).then(data => {
      if(data.res && (data.res.statusCode === 200) && data.res.body && data.res.body.access_token){
        //rediect to connect2page with accessToken
        const redirectPath = APP_CONFIG.CONNECT2_BASE_URL + APP_CONFIG.IDM_LOGIN_REDIRECT + data.res.body.access_token;
        console.log("GetIdmAccessToken redirecting to on success login:" + redirectPath);
        response.redirect(redirectPath);
      }else if(data.reject){
        throw data;
      }
    }).catch(err => {
      console.log("Error in getIdmData call :: " + err);
      if(err.res.statusCode === undefined){
        response.status(500).json(err.res);
      }else{
        response.status(err.res.statusCode).json(err.res);
      }
    });
  }

  getJWT(request: Request, response: Response): void {
    const jwtFormData = {
        client_id: APP_CONFIG.CLIENT_ID,
        client_secret: APP_CONFIG.CLIENT_SECRET,
        grant_type: APP_CONFIG.GRANT_TYPE,
        scope: APP_CONFIG.SCOPE
      },
      jwtConfig = {
        uri: APP_CONFIG.IDM_JWT_URL,
        rejectMsg: 'Unable to fetch jwt token'
      };
      this.httpHandle.fetchData(jwtConfig, jwtFormData).then((jwt: any) => {
      const jwtres = {
        token: jwt.res.body.access_token,
        expires_in: jwt.res.body.expires_in,
        token_type: jwt.res.body.token_type,
        scope: jwt.res.body.scope
      }
      this.setCookieToken(jwt.res.body.access_token, response);
      response.json(jwt.res.body);
    }, (errorMessage) => {
      console.log(errorMessage);
    });
  }
}

export default IdmController;
