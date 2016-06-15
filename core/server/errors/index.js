
var _                          = require('lodash'),
    chalk                      = require('chalk'),
    path                       = require('path'),
    Promise                    = require('bluebird'),
    NotFoundError              = require('./not-found-error'),
    BadRequestError            = require('./bad-request-error'),
    InternalServerError        = require('./internal-server-error'),
    NoPermissionError          = require('./no-permission-error'),
    MethodNotAllowedError      = require('./method-not-allowed-error'),
    RequestEntityTooLargeError = require('./request-too-large-error'),
    UnauthorizedError          = require('./unauthorized-error'),
    ValidationError            = require('./validation-error'),
    UnsupportedMediaTypeError  = require('./unsupported-media-type-error'),
    EmailError                 = require('./email-error'),
    DataImportError            = require('./data-import-error'),
    TooManyRequestsError       = require('./too-many-requests-error'),
    config,
    errors,

    userErrorTemplateExists   = false;



function getConfigModule() {
    if (!config) {
        config = require('../config');
    }

    return config;
}

function isValidErrorStatus(status) {
    return _.isNumber(status) && status >= 400 && status < 600;
}

function getStatusCode(error) {
    if (error.statusCode) {
        return error.statusCode;
    }

    if (error.status && isValidErrorStatus(error.status)) {
        error.statusCode = error.status;
        return error.statusCode;
    }

    if (error.code && isValidErrorStatus(error.code)) {
        error.statusCode = error.code;
        return error.statusCode;
    }

    error.statusCode = 500;
    return error.statusCode;
}

/**
 * Basic error handling helpers
 */
errors = {

    throwError: function (err) {
        if (!err) {
            err = new Error('errors.errors.anErrorOccurred');
        }

        if (_.isString(err)) {
            throw new Error(err);
        }

        throw err;
    },

    // ## Reject Error
    // Used to pass through promise errors when we want to handle them at a later time
    rejectError: function (err) {
        return Promise.reject(err);
    },

    logInfo: function (component, info) {
        if ((process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'staging' ||
            process.env.NODE_ENV === 'production')) {
            console.info(chalk.cyan(component + ':', info));
        }
    },

    logWarn: function (warn, context, help) {
        if ((process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'staging' ||
            process.env.NODE_ENV === 'production')) {
            warn = warn || 'errors.errors.noMessageSupplied';
            var msgs = [chalk.yellow('errors.errors.warning', warn), '\n'];

            if (context) {
                msgs.push(chalk.white(context), '\n');
            }

            if (help) {
                msgs.push(chalk.green(help));
            }

            // add a new line
            msgs.push('\n');

            console.log.apply(console, msgs);
        }
    },

    logError: function (err, context, help) {
        var self = this,
            origArgs = _.toArray(arguments).slice(1),
            stack,
            msgs;

        if (_.isArray(err)) {
            _.each(err, function (e) {
                var newArgs = [e].concat(origArgs);
                errors.logError.apply(self, newArgs);
            });
            return;
        }

        stack = err ? err.stack : null;

        if (!_.isString(err)) {
            if (_.isObject(err) && _.isString(err.message)) {
                err = err.message;
            } else {
                err = 'errors.errors.unknownErrorOccurred';
            }
        }


        if (err.indexOf('SQLITE_READONLY') !== -1) {
            context = 'errors.errors.databaseIsReadOnly';
            help = 'errors.errors.checkDatabase';
        }

        if ((process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'staging' ||
            process.env.NODE_ENV === 'production')) {
            msgs = [chalk.red('errors.errors.error', err), '\n'];

            if (context) {
                msgs.push(chalk.white(context), '\n');
            }

            if (help) {
                msgs.push(chalk.green(help));
            }

            // add a new line
            msgs.push('\n');

            if (stack) {
                msgs.push(stack, '\n');
            }

            console.error.apply(console, msgs);
        }
    },

    logErrorAndExit: function (err, context, help) {
        this.logError(err, context, help);

        process.exit(0);
    },

    logAndThrowError: function (err, context, help) {
        this.logError(err, context, help);

        this.throwError(err, context, help);
    },

    logAndRejectError: function (err, context, help) {
        this.logError(err, context, help);

        return this.rejectError(err, context, help);
    },

    logErrorWithRedirect: function (msg, context, help, redirectTo, req, res) {

        var self = this;

        return function () {
            self.logError(msg, context, help);

            if (_.isFunction(res.redirect)) {
                res.redirect(redirectTo);
            }
        };
    },

    /**
     * @param {Array} error
     * @return {{errors: Array, statusCode: number}}
     */
    formatHttpErrors: function formatHttpErrors(error) {
        var statusCode = 500,
            errors = [];

        if (!_.isArray(error)) {
            error = [].concat(error);
        }

        _.each(error, function each(errorItem) {
            var errorContent = {};


            statusCode = getStatusCode(errorItem);

            errorContent.message = _.isString(errorItem) ? errorItem :
                (_.isObject(errorItem) ? errorItem.message : 'errors.errors.unknownApiError');
            errorContent.errorType = errorItem.errorType || 'InternalServerError';
            errors.push(errorContent);
        });

        return {errors: errors, statusCode: statusCode};
    },

    formatAndRejectAPIError: function (error, permsMessage) {
        if (!error) {
            return this.rejectError(
                new this.NoPermissionError(permsMessage || 'errors.errors.notEnoughPermission')
            );
        }

        if (_.isString(error)) {
            return this.rejectError(new this.NoPermissionError(error));
        }

        if (error.errorType) {
            return this.rejectError(error);
        }

        // handle database errors
        if (error.code && (error.errno || error.detail)) {
            error.db_error_code = error.code;
            error.errorType = 'DatabaseError';
            error.statusCode = 500;

            return this.rejectError(error);
        }

        return this.rejectError(new this.InternalServerError(error));
    },

    handleAPIError: function errorHandler(err, req, res, next) {

        var httpErrors = this.formatHttpErrors(err);
        this.logError(err);
        // Send a properly formatted HTTP response containing the errors
        res.status(httpErrors.statusCode).json({errors: httpErrors.errors});
    },

    renderErrorPage: function (statusCode, err, req, res, next) {

   		console.log("errorCode" + statusCode +"....." +err);
    },

    error404: function (req, res, next) {
        var message = 'errors.errors.pageNotFound';

        // do not cache 404 error
        res.set({'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'});
        if (req.method === 'GET') {
            this.renderErrorPage(404, message, req, res, next);
        } else {
            res.status(404).send(message);
        }
    },

    error500: function (err, req, res, next) {
        var statusCode = getStatusCode(err),
            returnErrors = [];

        // 500 errors should never be cached
        res.set({'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'});

        if (statusCode === 404) {
            return this.error404(req, res, next);
        }

        if (req.method === 'GET') {
            if (!err || !(err instanceof Error)) {
                next();
            }
            errors.renderErrorPage(statusCode, err, req, res, next);
        } else {
            if (!_.isArray(err)) {
                err = [].concat(err);
            }

            _.each(err, function (errorItem) {
                var errorContent = {};

                errorContent.message = _.isString(errorItem) ? errorItem :
                    (_.isObject(errorItem) ? errorItem.message : 'errors.errors.unknownError');
                errorContent.errorType = errorItem.errorType || 'InternalServerError';
                returnErrors.push(errorContent);
            });

            res.status(statusCode).json({errors: returnErrors});
        }
    }
};

_.forEach([
    'logWarn',
    'logInfo',
    'rejectError',
    'throwError',
    'logError',
    'logAndThrowError',
    'logAndRejectError',
    'logErrorAndExit',
    'logErrorWithRedirect',
    'handleAPIError',
    'formatAndRejectAPIError',
    'formatHttpErrors',
    'renderErrorPage',
    'error404',
    'error500'
], function (funcName) {
    errors[funcName] = errors[funcName].bind(errors);
});

module.exports                            = errors;
module.exports.NotFoundError              = NotFoundError;
module.exports.BadRequestError            = BadRequestError;
module.exports.InternalServerError        = InternalServerError;
module.exports.NoPermissionError          = NoPermissionError;
module.exports.UnauthorizedError          = UnauthorizedError;
module.exports.ValidationError            = ValidationError;
module.exports.RequestEntityTooLargeError = RequestEntityTooLargeError;
module.exports.UnsupportedMediaTypeError  = UnsupportedMediaTypeError;
module.exports.EmailError                 = EmailError;
module.exports.DataImportError            = DataImportError;
module.exports.MethodNotAllowedError      = MethodNotAllowedError;
module.exports.TooManyRequestsError       = TooManyRequestsError;
