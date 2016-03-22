/**
 * @param {*}             value
 * @param {Object|String} options - Options with type field or just type
 *
 * @returns {String|undefined}
 */
const typeValidator = function(value, options) {
    if (value === undefined) {
        return;
    }

    if (!(options instanceof Object)) {
        options = { type: options };
    }

    options = Object.assign({}, typeValidator.options, options);

    const validationFunction = typeValidator.checks[options.type];

    if (!validationFunction) {
        throw new Error('Unsupported type');
    }

    if (!validationFunction(value)) {
        const message = options.message || 'придумать ошибку';
        return message instanceof Function ? message() : message;
    }
};

typeValidator.checks = {
    object: function(value) {
        return value === Object(value) && !(value instanceof Array);
    },

    array: function(value) {
        return value instanceof Array;
    },

    integer: function(value) {
        return Number.isInteger(value);
    },

    number: function(value) {
        return typeof value === 'number';
    },

    string: function(value) {
        return typeof value === 'string';
    },

    boolean: function(value) {
        return typeof value === 'boolean';
    },

    null: function(value) {
        return value === null;
    }
};

module.exports = typeValidator;