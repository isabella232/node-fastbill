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
exports.customerFactory = customerFactory;

var _fastbill_api = require('./fastbill_api');

var _errors = require('./utils/errors');

var _errors2 = _interopRequireDefault(_errors);

var _type_handler = require('./utils/type_handler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * __init__
 *
 * Defines the Customer API object which inherits from the Fastbill API object.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

class Customer extends _fastbill_api.FastbillAPI {
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

    get() {
        let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        try {
            (0, _type_handler.typeOf)(options).mustBe('object');
        } catch (err) {
            return Promise.reject(err);
        }

        return this.$request({
            service: this.$scope + 'get',
            filter: options.filter,
            limit: options.limit,
            offset: options.offset
        }).then(res => {
            return res.CUSTOMERS;
        });
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

    create() {
        let customer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        try {
            (0, _type_handler.typeOf)(customer).mustBe('object');
        } catch (err) {
            return Promise.reject(err);
        }

        return this.$request({
            service: this.$scope + 'create',
            data: customer
        }).then(res => {
            return res.CUSTOMER_ID;
        });
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
            (0, _type_handler.typeOf)(id).mustBe('number');
            (0, _type_handler.typeOf)(modification).mustBe('object');
        } catch (err) {
            return Promise.reject(err);
        }

        modification.CUSTOMER_ID = id;

        return this.$request({
            service: this.$scope + 'update',
            data: modification
        }).then(() => {
            return true;
        });
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
            (0, _type_handler.typeOf)(id).mustBe('number');
        } catch (err) {
            return Promise.reject(err);
        }

        return this.$request({
            service: this.$scope + 'delete',
            data: {
                CUSTOMER_ID: id
            }
        }).then(() => {
            return true;
        });
    }
}

function customerFactory(credentials) {
    return new Customer(credentials);
}