import {Prek12Service} from './prek12.service';
import { Headers, Http } from '@angular/http';

let http: Http;
let prek12Service = new Prek12Service(http);
describe('Testing prek12.service', () => {
    it('prek12Service.getSection function is defined', () => {
        expect(prek12Service.getSection).toBeDefined();
        expect((typeof prek12Service.getSection)).toBe('function');
    });

    it('prek12Service.getSection function is returning a promise', () => {
        let returnObj = prek12Service.getSection(1);
        expect((typeof returnObj.then)).toBe('function');
    });
    it('prek12Service.getSection function is resolving valid response', () => {
        return prek12Service.getSection(1).then(function(data){
            //Assertion for this data test case
        });
    });
});
