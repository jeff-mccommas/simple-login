import * as chai from 'chai';
import * as mocha from 'mocha';
import { Request, Response } from 'express';
import chaiHttp = require('chai-http');
import app from '../../server/app';
import APIRequest from '../../server/util/api-request';
import Connect2Controller from '../../server/controllers/connect2.controller';

const expect = chai.expect;
let apiRequest = new APIRequest();
let connect2Controller = new Connect2Controller(apiRequest);

chai.use(chaiHttp);

describe('Connect2 controller test cases', () => {
    var request:Request;
    var response:Response;
    it('connect2Controller.getC2Session function is defined', () => {
        expect(connect2Controller.getC2Session).to.exist;
        expect((typeof connect2Controller.getC2Session)).to.equals('function');
    });
});
