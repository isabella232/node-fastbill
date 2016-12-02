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


import {FastbillAPI} from './fastbill_api';
import {typeOf} from './utils/type_handler';

import {
    FastbillConnectionError,
    FastbillInvalidRequestError,
    FastbilValueError,
    FastbillTypeError
    } from './utils/errors';

/**
 * The Invoice broker which abstracts from the
 * Invoice services of the FastBill API.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

class Template extends FastbillAPI {
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
        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(
                        new FastbillInvalidRequestError({
                            message: 'Invalid Request to Fastbill.',
                            detail: err
                        })
                    );
                }
                resolve(resultset.TEMPLATES);
            }


            this.$request({
                service: this.$scope + 'get'
            }, onResult);
        });
    }
}

export function templateFactory(credentials) {
    return new Template(credentials);
}
