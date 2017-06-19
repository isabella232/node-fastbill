/*
 * fastbill automatic api wrapper for nodejs
 *
 * Copyright(c) 2015 maximilian greschke <maximilian.greschke@gmail.com>
 * MIT Licensed
 *
 */

/**
 * @author Maximilian Greschke <maximilian.greschke@gmail.com>
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.invoiceFactory = invoiceFactory;

var _fastbill_api = require('./fastbill_api');

var _type_handler = require('./utils/type_handler');

var _errors = require('./utils/errors');

/**
 * The Invoice broker which abstracts from the
 * Invoice services of the FastBill API.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

class Invoice extends _fastbill_api.FastbillAPI {
    constructor(credentials) {
        super(credentials);
        this.$scope = 'invoice.';
    }

    /**
     * Invoice#get
     *
     * Requests a set of Invoices from Fastbill
     *
     *
     * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.get
     *
     * Possible options:
     *
     *     limit: Limits the result set
     *     offset: ResultSet offset
     *     filter: Filter parameter for restricting the result set
     *
     * If no filter is passed, all invoices will be returned.
     *
     * @param {object} options Request options including filter, limit, offset
     *
     */

    get(options) {
        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(new _errors.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    }));
                }
                resolve(resultset.INVOICES);
            }

            options = options || {};

            (0, _type_handler.typeOf)(options).mustBe('object');

            this.$request({
                service: this.$scope + 'get',
                filter: options.filter,
                limit: options.limit,
                offset: options.offset
            }, onResult);
        });
    }

    /**
     * Invoice#create
     *
     * Creates a new Invoice
     *
     * The Invoice id of the newly created Invoice will be passed
     * to the callback function.
     *
     * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.create
     *
     * Usage example:
     *
     *     var Invoice = {
     *        CUSTOMER_ID: 1,
     *        CUSTOMER_COSTCENTER_ID: 2,
     *        CURRENCY_CODE: 3,
     *        TEMPLATE_ID: 4,
     *        INTROTEXT: "This is an introduction",
     *        INVOICE_TITLE:	"This is an invoice title",
     *        INVOICE_DATE: 	Date.now(),
     *        DELIVERY_DATE:	Date.now(),
     *        CASH_DISCOUNT_PERCENT: 	0,
     *        CASH_DISCOUNT_DAYS: 0,
     *        EU_DELIVERY: 1,
     *        ITEMS: [{
     *        ARTICLE_NUMBER: "DKADN123",
     *        DESCRIPTION: "Fancy sweater", // required
     *        QUANTITY: 2
     *        UNIT_PRICE: 12.5, // required
     *        VAT_PERCENT: 19.0, // required
     *        IS_GROSS: 1
     *        SORT_ORDER:
     *     }];
     *
     *     fastbill.Invoice.create(Invoice).then(...).catch(...)
     *
     * @param {object} invoice The Invoice that should be created.
     *
     */

    create(invoice) {

        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(new _errors.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    }));
                }

                resolve(resultset.INVOICE_ID);
            }

            invoice = invoice || {};

            (0, _type_handler.typeOf)(invoice).mustBe('object');
            (0, _type_handler.typeOf)(invoice.ITEMS).mustBe('object');
            (0, _type_handler.typeOf)(invoice.CUSTOMER_ID).mustBe('number');

            this.$request({
                service: this.$scope + 'create',
                data: invoice
            }, onResult);
        });
    }

    /**
     * Invoice#update
     *
     * Updates the information of a Invoice.
     *
     * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.update
     *
     * Usage example:
     *
     *     var invoice = {
     *         FIRST_NAME: 'André'
     *     };
     *
     *     fastbill.Invoice.update(1, invoice).then(...).catch(...)
     *
     *
     * @param {number} id The id of the Invoice that should be updated.
     * @param {object} invoice The invoices.
     *
     */

    update(id, invoice) {

        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(new _errors.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    }));
                }

                resolve(true);
            }

            (0, _type_handler.typeOf)(id).mustBe('number');
            (0, _type_handler.typeOf)(invoice).mustBe('object');
            invoice.INVOICE_ID = id;

            this.$request({
                service: this.$scope + 'update',
                data: invoice
            }, onResult);
        });
    }

    /**
     * Invoice#delete
     *
     * Deletes an Invoice.
     *
     * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.delete
     *
     * Usage example:
     *
     *     fastbill.Invoice.delete(1).then(...).catch(...)
     *
     * @param {number} id The id of the Invoice that should be deleted.
     *
     */

    remove(id) {

        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(new _errors.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    }));
                }

                resolve(true);
            }

            (0, _type_handler.typeOf)(id).mustBe('number');

            this.$request({
                service: this.$scope + 'delete',
                data: { INVOICE_ID: id }
            }, onResult);
        });
    }

    /**
     * Invoice#complete
     *
     * Marks an Invoice as complete.
     * Returns the invoice's invoice number.
     *
     * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.get
     *
     * Usage example:
     *
     *     fastbill.Invoice.complete(1).then(...).catch(...);
     *
     * @param {number} id The id of the Invoice that should be marked as complete.
     * @param {function} callback Error-first callback (err)
     *
     */

    complete(id) {
        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(new _errors.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    }));
                }
                resolve(resultset.INVOICE_NUMBER);
            }

            this.$request({
                service: this.$scope + 'complete',
                data: { INVOICE_ID: id }
            }, onResult);
        });
    }

    /**
     * Invoice#cancel
     *
     * Cancels an Invoice.
     * Returns the invoice's invoice number.
     *
     * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.cancel
     *
     * Usage example:
     *
     *     fastbill.Invoice.cancel(1).then(...).catch(...)
     *
     * @param {number} id The id of the Invoice that should be canceled.
     *
     */
    cancel(id) {

        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(new _errors.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    }));
                }
                resolve(resultset.INVOICE_NUMBER);
            }

            (0, _type_handler.typeOf)(id).mustBe('number');

            this.$request({
                service: this.$scope + 'cancel',
                data: { INVOICE_ID: id }
            }, onResult);
        });
    }

    /**
     * Invoice#sign
     *
     * Adds a qualified electronic signature to an invoice.
     * Requires paid credits on your fastbill account.
     *
     * Returns the number of credits left to sign invoices.
     *
     *
     * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.sign
     *
     * Usage example:
     *
     *     fastbill.Invoice.sign(1).then(...).catch(...)
     *
     * @param {number} id The id of the Invoice that should be canceled.
     *
     */

    sign(id) {

        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(new _errors.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    }));
                }
                resolve(resultset.REMAINING_CREDITS);
            }

            (0, _type_handler.typeOf)(id).mustBe('number');

            this.$request({
                service: this.$scope + 'sign',
                data: { INVOICE_ID: id }
            }, onResult);
        });
    }

    /**
     * Invoice#setpaid
     *
     * Sets an invoice to status paid.
     * Returns invoice number.
     *
     * See: http://www.fastbill-automatic.com/api/automatic/en/invoice.html#invoice.setpaid
     *
     * Usage example:
     *
     *     fastbill.Invoice.setpaid(1).then(...).catch(...)
     *
     * @param {number} id The id of the Invoice that should be set to paid.
     * @param {date} paidDate the date when the invoice was paid
     */

    setpaid(id, paidDate) {

        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(new _errors.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    }));
                }
                resolve(resultset.INVOICE_NUMBER);
            }

            (0, _type_handler.typeOf)(id).mustBe('number');

            paidDate = paidDate || null;

            this.$request({
                service: this.$scope + 'setpaid',
                data: {
                    INVOICE_ID: id,
                    PAID_DATE: paidDate
                }
            }, onResult);
        });
    }

    /**
     * Invoice#sendbyemail
     *
     * Sends an invoice per email
     * returns status
     *
     * See: https://www.fastbill.com/api/fastbill/de/invoice.html#invoice.sendbypost
     *
     * Usage:
     *   var message = {
     *      recipient: {
     *       TO: 'customer@mail.com'  // required
     *      },
     *      subject: ,
     *      text: ,
     *      receipt_confirmation
     *   }
     *   fastbill.Invoice.sendbyemail(1, message).then(...).catch(...)
     *
     * @param {number} id The id of the Invoice that should be sent
     * @param {object} message The message data to be sent
     */
    sendbyemail(id, message) {

        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(new _errors.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    }));
                }
                resolve(resultset.INVOICE_NUMBER);
            }

            (0, _type_handler.typeOf)(id).mustBe('number');
            (0, _type_handler.typeOf)(message).mustBe('object');
            (0, _type_handler.typeOf)(message.recipient).mustBe('object');
            (0, _type_handler.typeOf)(message.recipient.to).mustBe('string');

            let recipient = message.recipient;
            let subject = message.subject;
            let text = message.text;
            let receipt_confirmation = message.receipt_confirmation;

            this.$request({
                service: this.$scope + 'sendbyemail',
                data: {
                    INVOICE_ID: id,
                    RECIPIENT: recipient,
                    SUBJECT: subject,
                    MESSAGE: text,
                    RECEIPT_CONFIRMATION: receipt_confirmation
                }
            }, onResult);
        });
    }

}

function invoiceFactory(credentials) {
    return new Invoice(credentials);
}