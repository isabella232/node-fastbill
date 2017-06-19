/*
 * fastbill automatic api wrapper for nodejs
 *
 * Copyright(c) 2015 maximilian greschke <maximilian.greschke@gmail.com>
 * MIT Licensed
 *
 */

/**
 * @author Simon Tragatschnig <simon@codewerkstatt.at>
 *
 */

'use strict';


import chai from 'chai';
import nock from 'nock';

const FastBill = require('../index');
const expect = chai.expect;
const assert = chai.assert;


describe('The FastbillAPIs Template Interface', function () {

    afterEach( cb => {
        nock.cleanAll();
        cb();
    });

    let fastbill = FastBill.instantiate({
        email: "test@test.com",
        apikey: "abc123"
    });

    describe('Template.get', function () {
        it('should be defined', function () {
            expect(fastbill.template.constructor.prototype.hasOwnProperty('get')).to.equal(true);
        });


        it('should respond with a list of templates', function (done) {

            // set up mock response
            nock(fastbill.template.$uri)
                .post('', function (body) {
                    return body.service == 'template.get';
                })
                .reply(200, {
                    RESPONSE: {
                        TEMPLATES: ['object', 'object', 'object'],
                        ERRORS: null
                    }
                });

            fastbill.template.get()
                .then(function (result) {
                    console.log('got result ', result);
                    assert.typeOf(result, 'array', 'Returns a list of objects.');
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });

});