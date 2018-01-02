import _isEqual from 'lodash/isEqual';
import _reduce from 'lodash/reduce';
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
export const getChangedKeys = (first, second) => _reduce(first,(res, v, k) => _isEqual(v, second[k]) ? res : [...res, k], []);
/**
 *  * Get list of object property names (keys) that changed from previous.
 *  * @method getKeysAdded
 *  * @param {Object} first - Object to test.
 *  * @param {Object} second - Object to test against.
 *  * @return {Array[]} - object property names that changed in reference to the first.
 * Example: see getChangedKeys example.
 */
export const getKeysAdded = (objectBefore, objectAfter) => getChangedKeys(objectAfter, objectBefore);

/**
 *  * Get list of object property names (keys) that changed from next.
 *  * @method getKeysRemoved
 *  * @param {Object} second - Object to test.
 *  * @param {Object} first  - Object to test against.
 *  * @return {Array[]} - object property names that changed in reference to the second.
 * Example: see getChangedKeys example.
 */
export const getKeysRemoved = (objectBefore, objectAfter) => getChangedKeys(objectBefore, objectAfter);
