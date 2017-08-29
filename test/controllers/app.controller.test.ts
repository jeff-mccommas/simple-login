import * as chai from 'chai';
import * as mocha from 'mocha';
import { Request, Response } from 'express';
import chaiHttp = require('chai-http');
import app from '../../server/app';
import APIRequest from '../../server/util/api-request';
import AppController from '../../server/controllers/app.controller';

const expect = chai.expect;
const validTestUser = {
    username: "simplifiedtest",
    password: "614",
};
const invalidTestUser = {
    username: "simplifiedtest",
    password: "6142",
};
let apiRequest = new APIRequest();
let appController = new AppController(apiRequest);
chai.use(chaiHttp);

describe('App controller test cases', () => {
    var request:Request;
    var response:Response;
    it('appController.getURLConfig is defined and should be function', () => {
        expect(appController.getURLConfig).to.exist;
        expect((typeof appController.getURLConfig)).to.equals('function');
    });
    it('appController.validateContext is defined and should be function', () => {
        expect(appController.validateContext).to.exist;
        expect((typeof appController.validateContext)).to.equals('function');
    });
    it('appController.allowAccess is defined and should be function', () => {
        expect(appController.allowAccess).to.exist;
        expect((typeof appController.allowAccess)).to.equals('function');
    });
    it('appController.validateIP is defined and should be function', () => {
        expect(appController.validateIP).to.exist;
        expect((typeof appController.validateIP)).to.equals('function');
    });
    it('/api/urlconfig should return urlconfig data with status 200', (done) => {
        chai.request(app)
                .get('/api/urlconfig')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("helpUrl");
                done();
                });
    });
});
