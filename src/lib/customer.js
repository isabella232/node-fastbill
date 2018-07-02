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

import {
    FastbillAPI
} from './fastbill_api';
import Error from './utils/errors';
import {
    typeOf
} from './utils/type_handler';

import {
    FastbillConnectionError,
    FastbillInvalidRequestError,
    FastbilValueError,
    FastbillTypeError
} from './utils/errors';

/**
 * __init__
 *
 * Defines the Customer API object which inherits from the Fastbill API object.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

class Customer extends FastbillAPI {
    constructor(credentials) {
        super(credentials);
        this.$scope = 'customer.';
    }


    /**
     * Customer#get
     *
     * Requests a set of (filtered) Customer objects from the Fastbill API.
     * Returns an array of customer objects.
     *
     * See: http://www.fastbill-automatic.com/api/automatic/en/customer.html#customer.get
     *
     * Possible options:
     *
     *     limit: Limits the result set
     *     offset: ResultSet offset
     *     filter: Filter parameter for restricting the result set
     *
     * @param {object} options Possible request options (see above)
     *
     */

    get(options = {}) {
        try {
            typeOf(options).mustBe('object');
        } catch(err) {
            return Promise.reject(err);
        }

        return this.$request({
            service: this.$scope + 'get',
            filter: options.filter,
            limit: options.limit,
            offset: options.offset
        }).then(res => res.CUSTOMERS);
    }


    /**
     * Customer#create
     *
     * Creates a new customer
     *
     * The customer id of the newly created customer will be passed
     * to the callback function.
     * Returns the customer's customer id on success.
     *
     * See: http://www.fastbill-automatic.com/api/automatic/en/customer.html#customer.create
     *
     * Usage example:
     *
     *     let customer = {
     *            CUSTOMER_NUMBER: 'my-id-123'
     *            CUSTOMER_TYPE: 'consumer',
     *            FIRST_NAME:'test,
     *            LAST_NAME: 'test'
     *     };
     *
     *     fastbill.customer.create(customer).then(...).catch(...)
     *
     * @param {object} customer The customer that should be created.
     *
     */

    create(customer = {}) {
        try {
            typeOf(customer).mustBe('object');
        } catch(err) {
            return Promise.reject(err);
        }

        return this.$request({
            service: this.$scope + 'create',
            data: customer
        }).then(res => res.CUSTOMER_ID);
    }


    /**
     * Customer#update
     *
     * Updates the information of a customer.
     * Returns true on success.
     *
     * See: * See: http://www.fastbill-automatic.com/api/automatic/en/customer.html#customer.update
     *
     * Usage example:
     *
     *     let modification = {
     *         FIRST_NAME: 'André'
     *     };
     *
     *     node-fastbill-automatic.customer.update(1, modification).then(...).catch(...)
     *
     *
     * @param {number} id The id of the customer that should be updated.
     * @param {object} modification The modifications.
     *
     */

    update(id, modification) {
        try {
            typeOf(id).mustBe('number');
            typeOf(modification).mustBe('object');

        } catch(err) {
            return Promise.reject(err);
        }

        modification.CUSTOMER_ID = id;

        return this.$request({
            service: this.$scope + 'update',
            data: modification
        }).then(() => true);
    }

    /**
     * Customer#delete
     *
     * Deletes a customer.
     * Returns true on success.
     *
     * See: http://www.node-fastbill-automatic.com/api/en/customer.html#customer.delete
     *
     * Usage example:
     *
     *     node-fastbill-automatic.customer.delete(1).catch(...).then(...)
     *
     * @param {number} id The id of the customer that should be deleted.
     *
     */

    remove(id) {
        try {
            typeOf(id).mustBe('number');
        } catch(err) {
            return Promise.reject(err);
        }

        return this.$request({
            service: this.$scope + 'delete',
            data: {
                CUSTOMER_ID: id
            }
        }).then(() => true);
    }
}

export function customerFactory(credentials) {
    return new Customer(credentials);
}
