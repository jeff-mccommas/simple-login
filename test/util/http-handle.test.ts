import * as chai from 'chai';
import * as mocha from 'mocha';
import chaiHttp = require('chai-http');
import app from '../../server/app';
import HttpHandle from '../../server/util/http-handle';
import APIRequest from '../../server/util/api-request';
import { ApplicationConfig as APP_CONFIG } from '../../server/config/app_config';
const expect = chai.expect;
let getParamName = require('../testHelper');
let apiRequest = new APIRequest();
let httpHandle = new HttpHandle(apiRequest);
chai.use(chaiHttp);

describe('HTTP handle test cases', () => {
    it('fetchData function is defined', () => {
        expect(httpHandle.fetchData).to.exist;
        expect((typeof httpHandle.fetchData)).to.equals('function');
    });
    it('fetchData function accepts config and formData parameters', () => {
        var paramsList = getParamName(httpHandle.fetchData);
        expect(paramsList[0]).to.equals('config');
        expect(paramsList[1]).to.equals('formData');
    });
    const jwtFormData = {
        client_id: APP_CONFIG.CLIENT_ID,
        client_secret: APP_CONFIG.CLIENT_SECRET,
        grant_type: APP_CONFIG.GRANT_TYPE,
        scope: APP_CONFIG.SCOPE
    },
    jwtConfig = {
        uri: APP_CONFIG.IDM_JWT_URL,
        rejectMsg: 'Unable to fetch jwt token'
    };   
    it('fetchData function is defined', () => {
        expect((typeof httpHandle.fetchData)).to.equals('function');
    });
    it('fetchData returns a Promise', () => {
    var fetchDataReturnObj = httpHandle.fetchData(jwtConfig, jwtFormData);
        expect((typeof fetchDataReturnObj.then)).to.equals('function');
    });
    it('fetchData for jwt token returns 200 status', () => {
        var fetchDataReturnObj = httpHandle.fetchData(jwtConfig, jwtFormData);
        return fetchDataReturnObj.then(function(data) {
            expect(data.res.statusCode).to.equals(200);
        }).catch(function(m) { throw new Error('FetchData'); });
    });
});