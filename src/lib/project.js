/*
 * fastbill automatic api wrapper for nodejs
 *
 * Copyright(c) 2015 maximilian greschke <maximilian.greschke@gmail.com>
 * MIT Licensed
 *
 */

/**
 * @author Michael Jaser <michael.jaser@peerigon.com>
 *
 */

'use strict';

import {
    FastbillAPI
} from './fastbill_api';
import {
    typeOf
} from './utils/type_handler';

import {
    FastbillInvalidRequestError
} from './utils/errors';

/**
 * __init__
 *
 * Defines the Project API object which inherits from the Fastbill API object.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

class Project extends FastbillAPI {
    constructor(credentials) {
        super(credentials);
        this.$scope = 'project.';
    }


    /**
     * Project#get
     *
     * Requests a set of (filtered) Project objects from the Fastbill API.
     * Returns an array of project objects.
     *
     * See: https://www.fastbill.com/api/fastbill/en/project.html#project.get
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
        typeOf(options).mustBe('object');

        return this.$request({
                service: this.$scope + 'get',
                filter: options.filter,
                limit: options.limit,
                offset: options.offset
            })
            .then(res => res.PROJECTS)
            .catch(err => {
                throw new FastbillInvalidRequestError({
                    message: 'Invalid Request to Fastbill.',
                    detail: err
                });
            });
    }


    /**
     * Project#create
     *
     * Creates a new project
     *
     * The project id of the newly created project will be passed
     * to the callback function.
     * Returns the project's project id on success.
     *
     * See: https://www.fastbill.com/api/fastbill/de/project.html#project.create
     *
     * Usage example:
     *
     *     let project = {
     *            PROJECT_NAME: 'My awesome project'
     *            CUSTOMER_ID: '1234'
     *     };
     *
     *     fastbill.project.create(project).then(...).catch(...)
     *
     * @param {object} project The project that should be created.
     *
     */

    create(project = {}) {
        typeOf(project).mustBe('object');

        return this.$request({
            service: this.$scope + 'create',
            data: project
        })
        .then(res => res.PROJECT_ID)
        .catch(err => {
            throw new FastbillInvalidRequestError({
                message: 'Invalid Request to Fastbill.',
                detail: err
            });
        });
    }


    /**
     * Project#update
     *
     * Updates the information of a project.
     * Returns true on success.
     *
     * See: * https://www.fastbill.com/api/fastbill/de/project.html#project.update
     *
     * Usage example:
     *
     *     let modification = {
     *         PROJECT_NAME : 'Project XYZ'
     *     };
     *
     *     fastbill.project.update(1, modification).then(...).catch(...)
     *
     *
     * @param {number} id The id of the project that should be updated.
     * @param {object} modification The modifications.
     *
     */

    update(id, modification) {
        typeOf(id).mustBe('number');
        typeOf(modification).mustBe('object');
        modification.PROJECT_ID = id;

        return this.$request({
            service: this.$scope + 'update',
            data: modification
        })
        .then(() => true)
        .catch(err => {
            throw new FastbillInvalidRequestError({
                message: 'Invalid Request to Fastbill.',
                detail: err
            });
        });
    }

    /**
     * Project#delete
     *
     * Deletes a project.
     * Returns true on success.
     *
     * See: https://www.fastbill.com/api/fastbill/de/project.html#project.delete
     *
     * Usage example:
     *
     *     fastbill.project.delete(1).catch(...).then(...)
     *
     * @param {number} id The id of the project that should be deleted.
     *
     */

    remove(id) {
        typeOf(id).mustBe('number');

        return this.$request({
            service: this.$scope + 'delete',
            data: {
                PROJECT_ID: id
            }
        })
        .then(() => true)
        .catch(err => {
            throw new FastbillInvalidRequestError({
                message: 'Invalid Request to Fastbill.',
                detail: err
            });
        });
    }

}

export function projectFactory(credentials) {
    return new Project(credentials);
}
