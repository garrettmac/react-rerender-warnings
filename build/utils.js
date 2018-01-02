'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changedKeys = exports.isSameFunction = exports.shouldInclude = exports.toArray = exports.toRegExp = undefined;

var _constants = require('./constants');

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// utils
// ----------------
var toRegExp = exports.toRegExp = function toRegExp(s) {
    return (0, _isString3.default)(s) ? new RegExp('^' + s + '$') : s;
};
// convert to array
var toArray = exports.toArray = function toArray(o) {
    return o ? [].concat(o) : [];
};

//  react inlcude  path
var shouldInclude = exports.shouldInclude = function shouldInclude(displayName) {
    var include = toArray(_constants.DEFAULT_INCLUDE).map(toRegExp);
    var exclude = toArray(_constants.DEFAULT_EXCLUDE).map(toRegExp);
    return include.some(function (r) {
        return r.test(displayName);
    }) && !exclude.some(function (r) {
        return r.test(displayName);
    });
};

var isSameFunction = exports.isSameFunction = function isSameFunction(prev, next) {
    return [].concat(_toConsumableArray(prev), _toConsumableArray(next)).every(function (key) {
        return (0, _isFunction3.default)(prev[key]) && (0, _isFunction3.default)(next[key]) && prev[key].name === next[key].name;
    });
};
// merge all keys

// get all changed keys
var changedKeys = exports.changedKeys = function changedKeys(prev, next) {
    return [].concat(_toConsumableArray(prev), _toConsumableArray(next)).filter(function (key) {
        return prev[key] !== next[key] && !(0, _isEqual3.default)(prev[key], next[key]);
    });
};