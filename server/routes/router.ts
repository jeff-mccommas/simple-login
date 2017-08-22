import * as express from 'express';
import { Request, Response, Router } from 'express';
//import { Controller } from '../controllers/controller';
import { AppRouterInterface } from './router-interface';

let router: Router = express.Router();
let defaultRouter: Router = express.Router();
router.use(function (err, req, res, next) {  
    /* We log the error internaly */
    console.log(err);

    /* 
     * Remove Error's `stack` property. We don't want 
     * users to see this at the production env 
     */
    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }

    /* Finaly respond to the request */
    res.status(err.statusCode || 500).json(err);
});
export class AppRouter implements AppRouterInterface {

  constructor(public controller: any) {
    this.init();
  }

  public getRouter(): Router {
    return router;
  }

  public getDefaultRouter(): Router {
    return defaultRouter;
  }

  private init() {
    let self = this;
    router.get('/api/health', function (request: Request, response: Response) {
      response.status(200).send('Health check success');
    });
    // router.get('/api/contexts', function (request: Request, response: Response) {
    //   self.controller.getSectionDetail(request, response);
    // });
    router.get('/api/context', function (request: Request, response: Response) {
      self.controller.validateContext(request, response);
      //response.send('tagId is set to ' + request.query.clid);
    });
    router.get('/api/context/:clid', function (request: Request, response: Response) {
      self.controller.getStudentDetails(request, response);
    });
    router.get('/api/jwt', function (request: Request, response: Response) {
      self.controller.getJWT(request, response);
    });
    router.get('/api/c2session', function (request: Request, response: Response) {
      self.controller.getC2Session(request, response);
    });
    router.get('/api/urlconfig', function (request: Request, response: Response) {
      self.controller.getURLConfig(request, response);
    });
    router.post('/api/idmLogin', function (request: Request, response: Response) {
      self.controller.getIdmData(request, response);
    });
    // router.get('/api/jwt/middleware', function (request: Request, response: Response) {
    //   console.log('request.path :: %s', request.path);
    //   console.log('my token cookie:' ,request.cookies['_token']);
    //   var token = request.cookies['_token'];
    //   if (token){
    //     console.log('next flow');

    //     token = self.controller.getToken(request, response);
    //     console.log('my new token22 :' + token);
    //     response.json(token);
    //   }
    // });

    
    // router.get('/api/jwt/c2session', function (request: Request, response: Response) {
    //   console.log('request.path :: %s', request.path);
    //   //console.log('my token cookie:' ,request.cookies['_token']);
    //   var token = request.cookies['_token'];
    //   if (token){
    //     console.log('next flow');
    //     token = self.controller.getC2Profile(request, response);
    //     console.log('my new getC2Profile session token :' + token);
    //     response.json(token);
    //   }
    // });
    // router.get('/login', function (request: Request, response: Response) {
    //   self.controller.login(request, response, { currentUrl: request.query.current_url });
    // });

    // router.get('/index.html', function (request: Request, response: Response) {
    //   response.redirect('/');
    // });


    // For directing angular routes (or any other routes) to deafult path.
    // This will return the index.html only after the validation.
    defaultRouter.get('/*', function (request: Request, response: Response) {
      self.controller.validateIP(request, response);
   });

  }

}

export default AppRouter;