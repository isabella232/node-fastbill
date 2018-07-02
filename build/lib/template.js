/*
 * fastbill automatic api wrapper for nodejs
 *
 * Copyright(c) 2015 maximilian greschke <maximilian.greschke@gmail.com>
 * MIT Licensed
 *
 */

/**
 * @author Simon Tragatschnig <simon@codewerkstatt.at>
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.templateFactory = templateFactory;

var _fastbill_api = require('./fastbill_api');

var _errors = require('./utils/errors');

/**
 * The Invoice broker which abstracts from the
 * Invoice services of the FastBill API.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

class Template extends _fastbill_api.FastbillAPI {
    constructor(credentials) {
        super(credentials);
        this.$scope = 'template.';
    }

    /**
     * Template#get
     *
     * Requests all templates from Fastbill
     *
     *
     * See: https://www.fastbill.com/api/fastbill/de/template.html#template.get
     *
     */

    get() {
        return this.$request({
            service: this.$scope + 'get'
        }).then(res => {
            return res.TEMPLATES;
        }).catch(err => {
            throw new _errors.FastbillInvalidRequestError({
                message: 'Invalid Request to Fastbill.',
                detail: err
            });
        });
    }
}

function templateFactory(credentials) {
    return new Template(credentials);
}