import * as chai from 'chai';
import * as mocha from 'mocha';
import { Request, Response } from 'express';
import chaiHttp = require('chai-http');
import app from '../../server/app';
import APIRequest from '../../server/util/api-request';
import IdmController from '../../server/controllers/idm.controller';

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
let idmController = new IdmController(apiRequest);
chai.use(chaiHttp);

describe('IDM controller test cases', () => {
    var request: Request;
    var response: Response;
    it('idmController.getIdmData function is defined', () => {
        expect(idmController.getIdmData).to.exist;
        expect((typeof idmController.getIdmData)).to.equals('function');
    });
    it('idmController.getIdmAccessToken function is defined', () => {
        expect(idmController.getIdmAccessToken).to.exist;
        expect((typeof idmController.getIdmAccessToken)).to.equals('function');
    });
    it('getIdmAccessToken returns a Promise', () => {
        request = {
            body: validTestUser
        };
        var fetchDataReturnObj = idmController.getIdmAccessToken(request, response);
        expect((typeof fetchDataReturnObj.then)).to.equals('function');
    });
    it('Valid user should return 200', () => {
        request = {
            body: validTestUser
        };
        return idmController.getIdmAccessToken(request, response).then(function (data) {
            expect(data.res.statusCode).to.equals(200);
        });
    });
    it('InValid user should return 400', () => {
        var request: Request;
        var response: Response;
        request = {
            body: invalidTestUser
        };
        return idmController.getIdmAccessToken(request, response).then(function (data) {
            expect(data.res.statusCode).to.equals(400);
        });
    });
    it('/api/idmLogin should return 400 for invalid user', () => {
        return chai.request(app)
            .post('/api/idmLogin')
            .type('application/json')
            .send(invalidTestUser).catch((err) => {
                expect(err.response.statusCode).to.equals(400);
            });;
    });
    it('/api/jwt should return 200 status', (done) => {
        chai.request(app)
            .get('/api/jwt')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("access_token");
                done();
            });
    });
});
