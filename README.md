# node-fastbill

[![Circle CI](https://circleci.com/gh/veyo-care/node-fastbill/tree/master.svg?style=svg)](https://circleci.com/gh/veyo-care/node-fastbill-automatic/tree/master)

Complete and tested ES6 client for the fastbill API

Last tested on node v5.3.0

# quick start

    npm install node-fastbill

# available methods

The module exposes API functionality for customers, invoices, projects and subscriptions.
Access through fastbill.customer and fastbill.invoice (like in the example below).

# first example

    'use strict';
    import Fastbill from 'node-fastbill';
    
    const fastbill = Fastbill.instantiate(
        {
            email: 'YOUR_FASTBILL_EMAIL',
            apikey: 'YOUR_FASTBILL_API_KEY'
        }
    );
    
    // 1. create a customer
    fastbill.customer.create(
      {
        CUSTOMER_NUMBER: 1,
        CUSTOMER_TYPE: 'consumer',
        FIRST_NAME: 'Max',
        LAST_NAME: 'Michael'
    })
    .then(function(customerId){
        console.log(`The customer's fastbillId is ${customerId}`);
        })
    .catch(function(err){
        throw new Error('Customer creation failed');
    });
    
# development

1. Download the repository

2. Install dependencies

```
npm install
```

3. Transpile build

```
npm run build
```

4. Run tests

```
npm test
```

5. Run ESLint (broken)

```
npm run lint
```
