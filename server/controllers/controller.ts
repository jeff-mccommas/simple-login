import * as express from 'express';
import { Request, Response } from 'express';
import path = require('path');
import * as ajaxRequest from 'request';

import * as jwt from 'jwt-simple';
import * as jwtDecode from 'jwt-decode';
import * as _ from 'lodash';
import * as querystring from 'querystring';
//const ipware: any = require('ipware');
import { APIRequest } from '../util/api-request';
import { HttpHandle } from '../util/http-handle';
import { ApplicationConfig as APP_CONFIG } from '../config/app_config';
import {UrlConfig} from '../config/client/url-config';
const allowAccessPath: string = path.join(__dirname + './../../client/index.html');
let errorObj: any={
  success: false,
  msg: ''
};
import { ControllerInterface } from './controller-interface';
// const sections=[{id:10001,name:"Grade 2 Social Studies",image:"grade2sst",students:[{id:"10001_1",name:"test Student 1"},{id:"10001_2",name:"test Student 2"},{id:"10001_3",name:"test Student 3"},{id:"10001_4",name:"test Student 4"},{id:"10001_5",name:"test Student 5"},{id:"10001_6",name:"test Student 6"},{id:"10001_7",name:"test Student 7"},{id:"10001_8",name:"test Student 8"}]},{id:10002,name:"5th Grade Math","image": "grade5mth","students":[{id:"10002_1",name:"test Student math 1"},{id:"10002_2",name:"test Student math 2"},{id:"10002_3",name:"test Student math 3"},{id:"10002_4",name:"test Student math 4"},{id:"10002_5",name:"test Student math 5"},{id:"10002_6",name:"test Student math 6"},{id:"10002_7",name:"test Student math 7"},{id:"10002_8",name:"test Student math 8"}]},{id:10003,name:"Social Studies Grade 4","image":"grade4sst","students":[{id:"10003_1",name:"test Student sst 1"},{id:"10003_2",name:"test Student sst 2"},{id:"10003_3",name:"test Student sst 3"},{id:"10003_4",name:"test Student sst 4"},{id:"10003_5",name:"test Student sst 5"},{id:"10003_6",name:"test Student sst 6"},{id:"10003_7",name:"test Student sst 7"},{id:"10003_8",name:"test Student sst 8"}]},{id:10004,name:"English Grade 4","image":"grade4English","students":[{id:"10004_1",name:"test Student English 1"},{id:"10004_2",name:"test Student English 2"},{id:"10004_3",name:"test Student English 3"},{id:"10004_4",name:"test Student English 4"},{id:"10004_5",name:"test Student English 5"},{id:"10004_6",name:"test Student English 6"},{id:"10004_7",name:"test Student English 7"},{id:"10004_8",name:"test Student English 8"}]},{id:10005,name:"Science Grade 4","image":"grade4Science","students":[{id:"10005_1",name:"test Student Science 1"},{id:"10005_2",name:"test Student Science 2"},{id:"10005_3",name:"test Student Science 3"},{id:"10005_4",name:"test Student Science 4"},{id:"10005_5",name:"test Student Science 5"},{id:"10005_6",name:"test Student Science 6"},{id:"10005_7",name:"test Student Science 7"},{id:"10005_8",name:"test Student Science 8"}]}];

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
  setCookieToken(token: string, response: Response) {
    response.cookie('_token', token);
  }
  async getC2Session(request: Request, response: Response): Promise<any> {
    try{
      const c2sesFormData = {
          apitask: APP_CONFIG.C2_SESSION_APITASK,
          apikey : APP_CONFIG.C2_APIKEY,
          api : APP_CONFIG.C2_API,
          usr: APP_CONFIG.C2_USER,
          pwd: APP_CONFIG.C2_PWD,
          remember: APP_CONFIG.C2_REMEBER,
          endpoint : APP_CONFIG.C2_ENDPOINT
        },
        c2sesConfig = {
          uri: APP_CONFIG.C2_BASE_URL,
          rejectMsg: 'Unable to fetch C2 session'
        };
      const data = await this.httpHandle.fetchData(c2sesConfig, c2sesFormData);
      return data;
    }catch(err){
      console.log("Error in getC2Session call :: "+ err);
      return err;
      // if(err.statusCode === undefined){
      //   return response.status(500).json(err);
      // }else{
      //   return response.status(err.statusCode).json(err);
      // }
    }
  }
  async getC2Class(request: Request, response: Response, classId = '5003000037942'): Promise<any> {
    try{
      const reqData = await this.getC2Session(request, response);
      if(reqData.res.statusCode !== 200){
        throw reqData;
      }
      // console.log(`-------------------  ${c2Session}`)
      const c2clsFormData = {
          apitask: APP_CONFIG.C2_CLASS_APITASK,
          apikey : APP_CONFIG.C2_APIKEY,
          api : APP_CONFIG.C2_API,
          ses: reqData.res.body.values.ses,
          clid: classId
        },
        c2clsConfig = {
          uri: APP_CONFIG.C2_BASE_URL,
          rejectMsg: 'Unable to fetch C2 class'
        };
      const data = await this.httpHandle.fetchData(c2clsConfig, c2clsFormData);
      data.session = reqData.res.body.values.ses;
      return data;
    }catch(err){
      console.log("Error in getC2Class call :: " + err);
      //errorObj.msg = err;
      return err;
      // if(err.statusCode === undefined){
      //   return response.status(500).json(err);
      // }else{
      //   return response.status(err.statusCode).json(err);
      // }
    }
  }
  async getC2Students(request: Request, response: Response, classId = '5003000037942', needClassName = false): Promise<any> {
    try{
      let reqData;
      if(needClassName){
        reqData = await this.getC2Class(request, response);
      }else{
        reqData = await this.getC2Session(request, response);
      }
      if(reqData.res.statusCode !== 200){
        throw reqData;
      }
      const c2stuFormData = {
          apitask: APP_CONFIG.C2_CLASS_STU_APITASK,
          apikey : APP_CONFIG.C2_APIKEY,
          api : APP_CONFIG.C2_API,
          ses: reqData.session || reqData.res.body.values.ses,
          clid: classId
        },
        c2stuConfig = {
          uri: APP_CONFIG.C2_BASE_URL,
          rejectMsg: 'Unable to fetch C2 students'
        };
      const data = await this.httpHandle.fetchData(c2stuConfig, c2stuFormData);
      if(needClassName){
        //data.className = reqData.res.class.name;
        data.class = {
          name: reqData.res.body.class.name,
          image: this.getRandomInt() + '_large',
          clid: reqData.res.body.class.clid
        }
      }
      return data;
    }catch (err) {
      console.log("Error in getC2Students call :: " + err);
      return err;
      // errorObj.msg = err;
      // if(err.statusCode === undefined){
      //   return response.status(500).json(err);
      // }else{
      //   return response.status(err.statusCode).json(err);
      // }
    }
  }
  getStudentDetails(request: Request, response: Response) {
    this.getC2Students(request, response, request.params.clid, true).then(data =>  {
      if(data.res.statusCode !== 200){
        throw data;
      }
      const studentList = data.res.body.users.map(obj => {
        const fullname: string = ((obj.firstname != null && obj.firstname === '') && (obj.lastname != null && obj.lastname === ''))
          ? ((obj.name != null && obj.name === '')
            ? obj.usr
            : obj.name )
          : (obj.firstname + ' ' + (obj.lastname || '').charAt(0));
        const robj = {
          name: fullname,
          id: obj.stuid,
          image: this.getRandomInt() + '_large',
          email: obj.email,
          usr: obj.usr
        };
        return robj;
      });
      const finalData = {
        name: data.class.name,
        image: data.class.image,
        id: data.class.clid,
        students: studentList
      }
      response.json(finalData);
    }).catch(err => {
      console.log("Error in getStudentDetails call :: " + err);
      // errorObj.msg = e;
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
        token: jwt.res.access_token,
        expires_in: jwt.res.expires_in,
        token_type: jwt.res.token_type,
        scope: jwt.res.scope
      }
      this.setCookieToken(jwt.res.access_token, response);
      response.json(jwt);
      console.log('response : => ', jwtres);
    }, (errorMessage) => {
      console.log(errorMessage);
    });
  }
  getRandomInt(min: number= 1, max: number= 32): number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  validateContext(request: Request, response: Response): void {
    const redirectPath =  `/prek12/context/${request.query.clid}/students`;
    console.log(`Inside validatecontext and RP is ${redirectPath}`);
    response.redirect(redirectPath);
  }
  getURLConfig(request: Request, response: Response): void {
    const config: any = new UrlConfig().getConfig();
    response.json(config);
    //console.log(config);
  }
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

export default Controller;
