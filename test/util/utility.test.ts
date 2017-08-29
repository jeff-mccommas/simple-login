import * as chai from 'chai';
import * as mocha from 'mocha';
import chaiHttp = require('chai-http');
import app from '../../server/app';
import Utility from '../../server/util/utility';

import { ApplicationConfig as APP_CONFIG } from '../../server/config/app_config';
const expect = chai.expect;
const assert = chai.assert;
let getParamName = require('../testHelper');
let utility = new Utility();
chai.use(chaiHttp);

describe('Utility service test cases', () => {
    it('getRandomInt function should be defined', () => {
        expect(utility.getRandomInt).to.exist;
        expect((typeof utility.getRandomInt)).to.equals('function');
    });
    it('getRandomInt function should accepts min and max parameters', () => {
        var paramsList = getParamName(utility.getRandomInt);
        expect(paramsList[0]).to.equals('min');
        expect(paramsList[1]).to.equals('max');
    });
    it('getRandomInt should return number', () => {
        var outputValue = utility.getRandomInt(4, 10);
        expect((typeof outputValue)).to.equals('number');
    });
    it('getRandomInt should return number between min/max parameter', () => {
        var outputValue = utility.getRandomInt(4, 10);
        var isValidOutput = (outputValue >= 3 && outputValue <= 10);
        expect(isValidOutput).to.equals(true);
    });
});