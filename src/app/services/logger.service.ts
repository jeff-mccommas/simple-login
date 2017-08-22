import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  logs: string[] = []; // capture logs for testing
  constructor() { }
  log(message: string) {
    this.logs.push(message);
    console.log(message);
  }

}
