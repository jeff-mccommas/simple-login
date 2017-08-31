import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).do( (event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          console.log('-----> success');
        // do stuff with response if you want
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
          console.log('--------> error '+err)
          if (err.status === 401) {
             // JWT expired, go to login
             // Observable.throw(err);
          }
        }
    })
  }
}
