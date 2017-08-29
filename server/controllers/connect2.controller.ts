import * as express from 'express';
import { Request, Response } from 'express';
import { APIRequest } from '../util/api-request';
import { HttpHandle } from '../util/http-handle';
import { Utility } from '../util/utility';
import { ApplicationConfig as APP_CONFIG } from '../config/app_config';
import { ControllerInterface } from './controller-interface';
let errorObj: any={
  success: false,
  msg: ''
};

export class Connect2Controller implements ControllerInterface {
  public httpHandle:HttpHandle; 
  public utility:Utility;
  constructor(public apiRequest: APIRequest) {
      this.httpHandle = new HttpHandle(apiRequest);
      this.utility = new Utility();
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
      return err;
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
        data.class = {
          name: reqData.res.body.class.name,
          image: this.utility.getRandomInt() + '_large',
          clid: reqData.res.body.class.clid
        }
      }
      return data;
    }catch (err) {
      console.log("Error in getC2Students call :: " + err);
      return err;
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
          image: this.utility.getRandomInt() + '_large',
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
      if(err.res.statusCode === undefined){
        response.status(500).json(err.res);
      }else{
        response.status(err.res.statusCode).json(err.res);
      }
    });
  }
}

export default Connect2Controller;
