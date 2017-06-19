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

describe('The API Wrapper Object', function () {
    
    let credentials = {email: '', apikey: ''};
    
    it('should be instantiated as expected', function () {
        let fastbill = FastBill.instantiate(credentials);
        
        expect(fastbill).to.exist;
    });

    it('should have interfaces for Customers and Invoices', function () {
        let fastbill = FastBill.instantiate(credentials);

        expect(fastbill.customer).to.exist;
        expect(fastbill.customer.constructor.name).to.equal('Customer');

        expect(fastbill.invoice).to.exist;
        expect(fastbill.invoice.constructor.name).to.equal('Invoice');

        expect(fastbill.template).to.exist;
        expect(fastbill.template.constructor.name).to.equal('Template');

    });
    
    it('should throw an error when no credentials are passed for instantiation', function () {
        let fastbill;

        try {
            fastbill = FastBill.instantiate();
        } catch (e) {
            expect(e).to.exist;
        }
    });
    

});