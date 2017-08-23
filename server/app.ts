import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import path = require('path');

import { ApplicationConfig as APP_CONFIG } from './config/app_config';
import { AppRouter } from './routes/router';
import { Controller } from './controllers/controller';
import { IdmController } from './controllers/idm.controller';
import { APIRequest } from './util/api-request';
import { HttpHandle } from './util/http-handle';
var https = require('https');
// var http = require('http');
// var fs = require('fs');
// var options = {
//       cert: fs.readFileSync('C:/Users/anandkumar/Desktop/ssl/localhost_7029.cert'),
//       key: fs.readFileSync('C:/Users/anandkumar/Desktop/ssl/localhost_7029.key')
//   };

// initialize express app
let app = express();

// Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

process.on('uncaughtException', function (err: any) {
  console.log('Caught exception: ' + err, err.stack);
});

// keep it above express static.
// since we have to override default '/' routing to handle in here, instead of serving index.html.
let apiRequest = new APIRequest();
let controller = new Controller(apiRequest);
let idmController = new IdmController(apiRequest);
let routes = new AppRouter(controller, idmController);
app.use('/', routes.getRouter());
app.use('/', express.static(path.resolve(__dirname, '../client')));
app.use('/', routes.getDefaultRouter());
app.all('*', function(req, res) {
  //Handling BAD Request
  console.log("Is a bad request");
  throw new Error("Bad request");
});

// Handle 500
app.use(function (err: Error, req: Request, res: Response, next: any) {
  //Logging error in our console
  console.log('err', err);
  if (err.message === "Bad request") {
    console.log("Responding Bad Request HTML 400");
    res.redirect(APP_CONFIG.ERR_400);
  } else {
    console.log("Responding Server Error 500");
    res.redirect(APP_CONFIG.ERR_500);
  }
});
// Two ways to get NODE_ENV process.env.NODE_ENV && app.get('env')
let PORT = APP_CONFIG.PORT || 7028;
// let PORT = process.env.PORT || '7028';

app.listen(PORT, function() {
  console.log({
    'env': process.env.NODE_ENV,
    'message': 'SimplifiedLogin WEB API server has been started.',
    'port': PORT
  });
});
export default app;