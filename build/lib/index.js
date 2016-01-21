/*
 * fastbill automatic api wrapper for nodejs
 *
 * Copyright(c) 2015 maximilian greschke <maximilian.greschke@gmail.com>
 * MIT Licensed
 *
 */

/**
 *
 * @author Maximilian Greschke <maximilian.greschke@gmail.com>
 *
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instantiate = instantiate;

var _customer = require('./customer');

var _invoice = require('./invoice');

var _type_handler = require('./utils/type_handler');

/**
 * Creates a FastBill communication object that provides the access to all
 * available API services.
 *
 * Usage example:
 *
 *      var FastBill = require('node-fastbill-automatic');
 *      var fastbill = FastBill.instantiate({email: '', apikey: ''});
 *      fastbill.customer.get(...);
 *
 * @param {object} credentials E-Mail address and the API key.
 * @returns {object}
 *
 */

function instantiate(credentials) {

  (0, _type_handler.typeOf)(credentials).mustBe('object');

  return {
    customer: (0, _customer.customerFactory)(credentials),
    invoice: (0, _invoice.invoiceFactory)(credentials)
  };
}