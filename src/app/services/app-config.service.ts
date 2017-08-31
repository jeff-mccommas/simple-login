import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AppConfigService {
  configVal: EventEmitter<any> = new EventEmitter();
  config: any;
  constructor(private http: Http) { }
  load(): any {
      return new Promise((resolve)=>{
            this.http.get('api/urlconfig').map(res => res)
            .subscribe(data =>{
                 this.config = data;
                 resolve();
            }
                //(data) => this.configVal.emit(data)
            );
      });
    }
    getConfig():any {
        return this.config;
    }

}

