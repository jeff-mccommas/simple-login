import * as express from 'express';
import { Request, Response, Router } from 'express';

let router: Router = express.Router();
// let clientController: IClientController;

export interface AppRouterInterface {
  getRouter(): Router;
  getDefaultRouter(): Router;
}

export default AppRouterInterface;