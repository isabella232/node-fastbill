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

import {post} from './utils/http';
import { FastbillInvalidRequestError } from './utils/errors';

export class FastbillAPI {
    constructor(credentials) {
        let auth = Buffer.from(`${credentials.email}:${credentials.apikey}`)
            .toString('base64');
        this.$uri = 'https://my.fastbill.com/api/1.0/api.php';
        this.$headers = {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json'
        };
    }

    /**
     * Performs a HTTP request against the FastBill API.
     *
     * @param {object} payload The request pattern (e.g. filter, data, service, etc.)
     *
     */

    $request(payload) {
        let options = {
            uri: this.$uri,
            headers: this.$headers,
            data: payload && JSON.stringify(payload)
        };

        return post(options)
            .then(function (json) {
                let data;

                try {
                    data = JSON.parse(json).RESPONSE;
                } catch (e) {
                    throw new FastbillInvalidRequestError({
                        message: 'Unable to parse response',
                        detail: e
                    });
                }

                // Check if the FastBill API responds with errors
                // If so, create an error object with the first available error message.
                if (data.ERRORS) {
                    throw new Error(data.ERRORS[0]);
                }
                return data;
            });
    }
}
