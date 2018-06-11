/*
 * fastbill automatic api wrapper for nodejs
 *
 * Copyright(c) 2015 maximilian greschke <maximilian.greschke@gmail.com>
 * MIT Licensed
 *
 */

/**
 * @author Maximilian Greschke <maximilian.greschke@gmail.com>
 *
 */

'use strict';


import chai from 'chai';
import nock from 'nock';

const FastBill = require('../index');
const expect = chai.expect;
const assert = chai.assert;


describe('The FastbillAPIs Project Interface', function () {

    afterEach( cb => {
        nock.cleanAll();
        cb();
    });

    let fastbill = FastBill.instantiate({
        email: "test@test.com",
        apikey: "abc123"
    });

    describe('Project.get', function () {
        it('should be defined', function () {
            expect(fastbill.project.constructor.prototype.hasOwnProperty('get')).to.equal(true);
        });


        it('should respond with a list of projects', function (done) {

            // set up mock response
            nock(fastbill.invoice.$uri)
                .post('', function (body) {
                    return body.service == 'project.get';
                })
                .reply(200, {
                    RESPONSE: {
                        PROJECTS: ['object', 'object', 'object'],
                        ERRORS: null
                    }
                });

            let options = {some: 'object'};
            fastbill.project.get(options)
                .then(function (result) {
                    assert.typeOf(result, 'array', 'Returns a list of objects.');
                    done();
                }, done);
        });
    });

    describe('Project.create', function () {
        it('should be defined', function () {
            expect(fastbill.project.constructor.prototype.hasOwnProperty('create')).to.equal(true);
        });


        it('should respond with a fastbill invoice id', function (done) {

            // set up mock response
            nock(fastbill.project.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        PROJECT_ID: 1,
                        ERRORS: null
                    },
                    PROJECT_ID: 1
                });

            let newProject = {
                PROJECT_NAME: 'test',
                CUSTOMER_ID: 1
            };
            let promise = fastbill.project.create(newProject);

            promise.then(function (result) {
                assert.typeOf(result, 'number', 'Returns a project_id.');
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });

    });

    describe('Project.update', function () {
        it('should be defined', function () {
            expect(fastbill.project.constructor.prototype.hasOwnProperty('update')).to.equal(true);
        });

        it('should not respond with an error', function (done) {

            // set up mock response
            nock(fastbill.project.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        STATUS: 'success',
                        ERRORS: null
                    }
                });

            let id = 1,
                modification = {PROJECT_NAME: 'New Project title'};
            let promise = fastbill.project.update(id, modification);

            promise.then(function (result) {
                expect(result).to.equal(true);
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });

    });


    describe('Project.remove', function () {
        it('should be defined', function () {
            expect(fastbill.project.constructor.prototype.hasOwnProperty('remove')).to.equal(true);
        });

        it('should not respond with an error', function (done) {

            nock(fastbill.project.$uri)
                .post('')
                .reply(200, {
                    RESPONSE: {
                        STATUS: 'success',
                        ERRORS: null
                    }
                });

            let id = 1;

            fastbill.project.remove(id).then(function (result) {
                expect(result).to.equal(true);
                done();
            }, function (err) {
                done(
                    new Error('Promise should be resolved')
                );
            });
        });
    });

});