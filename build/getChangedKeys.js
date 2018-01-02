'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKeysRemoved = exports.getKeysAdded = exports.getChangedKeys = undefined;

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 *  * Get list of object property names (keys) that changed between two objects.
 *  * @method getChangedKeys
 *  * @param {Object} first - Object to test.
 *  * @param {Object} second - Object to test against.
 *  * @return {Array[]} - object property names that changed in reference to the first.
 * Example:
// ------------------------------------------------------------------
 let first = {
                 'a': { 'a1': 1 },
                 'b': { 'b1': 1, 'b2': 2 },
                 'c': { 'c1': 1, 'c2': 2 },
                 'd': { 'd1': 1, 'd2': 2 },
                 'e': 5
             };
let second = {
                 'a': { 'a1': 1 },
                 'b': { 'b2': 2, 'b1': 1, },         // swapped 'b1' and 'b2' position (deep check - returns nothing)
                 'c': { 'c1': 1 },                   // removed 'c2'
                 'd': { 'd1': 1, 'd2': 2, 'd3': 3 }, // added 'd3'
                 'z': 5                              // removed 'e', added 'z'
          };


        getChangedKeys(first,second)
        // => ["c", "d", "e"]
        getChangedKeys(second, first)
         // => ["c", "d", "z"]
// ------------------------------------------------------------------

 */
var getChangedKeys = exports.getChangedKeys = function getChangedKeys(first, second) {
  return (0, _reduce3.default)(first, function (res, v, k) {
    return (0, _isEqual3.default)(v, second[k]) ? res : [].concat(_toConsumableArray(res), [k]);
  }, []);
};
/**
 *  * Get list of object property names (keys) that changed from previous.
 *  * @method getKeysAdded
 *  * @param {Object} first - Object to test.
 *  * @param {Object} second - Object to test against.
 *  * @return {Array[]} - object property names that changed in reference to the first.
 * Example: see getChangedKeys example.
 */
var getKeysAdded = exports.getKeysAdded = function getKeysAdded(objectBefore, objectAfter) {
  return getChangedKeys(objectAfter, objectBefore);
};

/**
 *  * Get list of object property names (keys) that changed from next.
 *  * @method getKeysRemoved
 *  * @param {Object} second - Object to test.
 *  * @param {Object} first  - Object to test against.
 *  * @return {Array[]} - object property names that changed in reference to the second.
 * Example: see getChangedKeys example.
 */
var getKeysRemoved = exports.getKeysRemoved = function getKeysRemoved(objectBefore, objectAfter) {
  return getChangedKeys(objectBefore, objectAfter);
};