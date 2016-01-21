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

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.post = post;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Comfortable wrapper for performing a HTTP POST request.
 *
 * Possible options:
 *
 *     uri: {string}
 *     headers: {object}
 *     data: {string}
 *
 * @param {object} options Possible request options
 *
 */

function post(options) {
    return new Promise(function (resolve, reject) {
        let params;
        let request;

        options.uri = options.uri || '';
        params = _url2.default.parse(options.uri);
        params.method = 'POST';
        params.headers = options.headers;

        request = (params.protocol === 'https:' ? _https2.default : _http2.default).request(params, function onResponse(response) {
            let body = '';

            response.on('data', function onData(data) {
                body = body + data.toString();
            });

            response.on('end', function onEnd() {
                body = body || { ERRORS: null };
                resolve(body);
            });
        });

        request.on('error', function onError(err) {
            return reject(new _errors2.default.FastbillConnectionError({
                message: 'Communication error.',
                detail: err
            }));
        });

        request.write(options.data || '');
        request.end();
    });
}