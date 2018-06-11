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

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.projectFactory = projectFactory;

var _fastbill_api = require('./fastbill_api');

var _errors = require('./utils/errors');

var _errors2 = _interopRequireDefault(_errors);

var _type_handler = require('./utils/type_handler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * __init__
 *
 * Defines the Project API object which inherits from the Fastbill API object.
 *
 * @param {object} credentials The email and api key tupel.
 *
 */

class Project extends _fastbill_api.FastbillAPI {
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

    get(options) {
        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(new _errors.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    }));
                }
                resolve(resultset.PROJECTS);
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

    create(project) {
        return new Promise((resolve, reject) => {
            function onResult(err, resultset) {
                if (err) {
                    return reject(new _errors.FastbillInvalidRequestError({
                        message: 'Invalid Request to Fastbill.',
                        detail: err
                    }));
                }

                resolve(resultset.PROJECT_ID);
            }

            project = project || {};
            (0, _type_handler.typeOf)(project).mustBe('object');

            this.$request({
                service: this.$scope + 'create',
                data: project
            }, onResult);
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
            (0, _type_handler.typeOf)(modification).mustBe('object');

            modification.PROJECT_ID = id;

            this.$request({
                service: this.$scope + 'update',
                data: modification
            }, onResult);
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
        return new Promise((resolve, reject) => {
            function onResult(err) {
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
                data: { PROJECT_ID: id }
            }, onResult);
        });
    }

}

function projectFactory(credentials) {
    return new Project(credentials);
}