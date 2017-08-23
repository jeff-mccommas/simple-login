import { expect } from 'chai';
import * as mocha from 'mocha';
import app from '../server/app';
describe('Demo Hello function', () => {
  it('return hello world', () => {
    const result = "Hello World!";
    expect(result).to.equal('Hello World!');
  });
});