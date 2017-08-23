import * as express from 'express';
import { Request, Response } from 'express';
import { APIRequest } from '../util/api-request';

export interface ControllerInterface {
    apiRequest: APIRequest;
    //verifyAccessToken(token: string, response: Response): void;
    //denyAccess(response: Response): void;
    //allowAccess(response: Response): void;
    // onIPAuthSuccess(response: Response) : void;
    //onLoginSuccess(request: Request, response: Response, state: any): void;
    //validateIP(request: Request, response: Response): void;
    //getAccessToken(request: Request, response: Response): void;
    //getUserDetails(request: Request, response: Response): void;
    // verifyUserAgainstOrg(request: Request, response: Response): void;
    // validateContext(request: Request, response: Response): void;
    // getStudentDetails(request: Request, response: Response): void;
}

export default ControllerInterface;