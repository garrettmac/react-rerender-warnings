import {
    DEFAULT_INCLUDE,
    DEFAULT_EXCLUDE,
} from './constants';
import _isString from 'lodash/isString';
import _isFunction from 'lodash/isFunction';
import _isEqual from 'lodash/isEqual';


// utils
// ----------------
export const toRegExp = s => _isString(s) ? new RegExp(`^${s}$`) : s;
// convert to array
export const toArray = o => o ? [].concat(o) : [];

//  react inlcude  path
export const shouldInclude = displayName => {
    let include = toArray(DEFAULT_INCLUDE).map(toRegExp);
    let exclude = toArray(DEFAULT_EXCLUDE).map(toRegExp);
    return include.some(r => r.test(displayName)) && !exclude.some(r => r.test(displayName));
};

export const isSameFunction = (prev, next) => [...prev, ...next].every(key => _isFunction(prev[key]) && _isFunction(next[key]) && prev[key].name === next[key].name);
// merge all keys

// get all changed keys
export const changedKeys = (prev, next) => [...prev, ...next].filter(key => prev[key] !== next[key] && !_isEqual(prev[key], next[key]));
