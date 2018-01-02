'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDisplayNames = exports.getComponentGrandParentName = exports.getComponentParentName = exports.getComponentName = undefined;

var _lowbar = require('lowbar');

var _lowbar2 = _interopRequireDefault(_lowbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  * Get component name
 *  * @method getComponentName
 */
var getComponentName = exports.getComponentName = function getComponentName(o) {
  return _lowbar2.default.getFirstOf(o, ['constructor.displayName', 'constructor.name']);
};
/**
 *  * Get component parent name
 *  * @method getComponentParentName
 */

var getComponentParentName = exports.getComponentParentName = function getComponentParentName(o) {
  return _lowbar2.default.getFirstOf(o, ['_reactInternalFiber._debugOwner.stateNode.constructor.name']);
}; //, '_reactInternalFiber._debugOwner.stateNode.constructor.displayName', '_reactInternalFiber._debugOwner.stateNode.type', '_reactInternalInstance._currentElement._owner._instance.__proto__.constructor.displayName', '_reactInternalInstance._currentElement._owner._instance.__proto__.constructor.name', '_reactInternalInstance._currentElement._owner._instance.__proto__.displayName'])
/**
 *  * Get component grand parent name
 *  * @method getComponentGrandParentName
 */

var getComponentGrandParentName = exports.getComponentGrandParentName = function getComponentGrandParentName(o) {
  return _lowbar2.default.getFirstOf(o, ['_reactInternalFiber._debugOwner.stateNode._reactInternalFiber._debugOwner.stateNode.constructor.name']);
};
/**
 *  * Get component getDisplayNames
 *  * @method getDisplayNames
 */

var getDisplayNames = exports.getDisplayNames = function getDisplayNames(_this) {
  var displayName = getComponentName(_this) ? '%c ' + getComponentName(_this) + ' %c>%c' : '';
  var displayParentName = getComponentParentName(_this) ? '%c ' + getComponentParentName(_this) + ' >' : '';
  var displayGrandParentName = getComponentGrandParentName(_this) ? '%c ' + getComponentGrandParentName(_this) + ' >' : '';
  return { displayName: displayName, displayParentName: displayParentName, displayGrandParentName: displayGrandParentName };
};