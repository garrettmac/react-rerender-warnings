'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _lowbar = require('lowbar');

var _lowbar2 = _interopRequireDefault(_lowbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// import _pick from 'lodash/pick'


// constants
// ----------------

var DEFAULT_INCLUDE = /./;
var DEFAULT_EXCLUDE = /[^a-zA-Z0-9]/;
var UNAVOIDABLE = 'unavoidable';
var SHALLOW = 'Shallow';
var DEEP = 'Deep';
var FUNCTIONS = 'Function';

// utils
// ----------------
var toRegExp = function toRegExp(s) {
	return (0, _isString3.default)(s) ? new RegExp('^' + s + '$') : s;
};
// convert to array
var toArray = function toArray(o) {
	return o ? [].concat(o) : [];
};
// get  component name
var getComponentName = function getComponentName(o) {
	return _lowbar2.default.getFirstOf(o, ['constructor.displayName', 'constructor.name']);
};
// get parent component name
var getComponentParentName = function getComponentParentName(o) {
	return _lowbar2.default.getFirstOf(o, ['_reactInternalFiber._debugOwner.stateNode.constructor.name', '_reactInternalFiber._debugOwner.stateNode.constructor.displayName', '_reactInternalFiber._debugOwner.stateNode.type', '_reactInternalInstance._currentElement._owner._instance.__proto__.constructor.displayName', '_reactInternalInstance._currentElement._owner._instance.__proto__.constructor.name', '_reactInternalInstance._currentElement._owner._instance.__proto__.displayName']);
};
//  react inlcude  path
var shouldInclude = function shouldInclude(displayName) {
	var include = toArray(DEFAULT_INCLUDE).map(toRegExp);
	var exclude = toArray(DEFAULT_EXCLUDE).map(toRegExp);
	return include.some(function (r) {
		return r.test(displayName);
	}) && !exclude.some(function (r) {
		return r.test(displayName);
	});
};

var isSameFunction = function isSameFunction(prev, next) {
	return [].concat(_toConsumableArray(prev), _toConsumableArray(next)).every(function (key) {
		return (0, _isFunction3.default)(prev[key]) && (0, _isFunction3.default)(next[key]) && prev[key].name === next[key].name;
	});
};
// merge all keys

// get all changed keys
var changedKeys = function changedKeys(prev, next) {
	return [].concat(_toConsumableArray(prev), _toConsumableArray(next)).filter(function (key) {
		return prev[key] !== next[key] && !(0, _isEqual3.default)(prev[key], next[key]);
	});
};

function createComponentDidUpdate(_ref) {
	var logger = _ref.logger;

	return function componentDidUpdate(prevProps, prevState) {
		var displayName = getComponentName(this);
		var displayParentName = getComponentParentName(this);

		if (!displayName || !prevProps || !this.props || !this.state || !prevState || !shouldInclude(displayName)) return;
		var propType = void 0;
		if ((0, _isEqual3.default)(prevProps, this.props)) propType = DEEP;else if (prevProps === this.props) propType = SHALLOW;else if (changedKeys(prevState, this.state).every(isSameFunction)) stateType = FUNCTIONS; //_.pick(prev, changedKeys)

		var stateType = void 0;
		if ((0, _isEqual3.default)(prevState, this.state)) stateType = DEEP;else if (prevState === this.state) stateType = SHALLOW;else if (changedKeys(prevState, this.state).every(isSameFunction)) stateType = FUNCTIONS; //_.pick(prev, changedKeys)

		if (!propType || !stateType) return;

		// ----------
		var propsDiff = {
			prev: prevProps,
			next: this.props,
			name: displayName,
			parentName: displayParentName
		};
		var stateDiff = {
			prev: prevState,
			next: this.state,
			name: displayName,
			parentName: displayParentName
		};

		var firstColor = 'color: #5FB0B7';
		var secondColor = 'color: #525B76';
		var thirdColor = 'color: #525B76';
		if (stateType === SHALLOW) {
			firstColor = 'color: #F3B3A6';
			secondColor = 'color: #B98B82';
			thirdColor = 'color: #E4959E';
		}
		if (stateType === DEEP) {
			firstColor = 'color: #F56476';
			secondColor = 'color: #d76476';
			thirdColor = 'color: #c36476';
		}
		if (stateType === FUNCTIONS) {
			firstColor = 'color: #ADA8BE';
			secondColor = 'color: #C6CAED';
			thirdColor = 'color: #A28497';
		}
		// if (stateType === DEEP) firstColor = '#F56476';
		// if (stateType === DEEP) firstColor = '#d76476';
		// if (stateType === DEEP) firstColor = '#c36476';

		var message = "No Message";

		if (stateType === SHALLOW) message = 'This is an avoidable re-render! Performs a reference comparison between two values to determine if they are equivalent. (goo.gl/nVgNxd)';else if (stateType === DEEP) message = 'This is an avoidable re-render! Performs a deep comparison between two values to determine if they are equivalent. (https://goo.gl/RQxPCN)';else if (stateType === FUNCTIONS) message = 'This is a possibly an avoidable re-render. Changes took place in functions only.';
		var propChangesList = (0, _omit3.default)(this.props, Object.keys(prevProps));
		var stateChangesList = (0, _omit3.default)(this.state, Object.keys(prevState));
		var propsChanged = [].concat(_toConsumableArray(Object.keys(propChangesList)), _toConsumableArray(Object.keys(stateChangesList)));

		// let changes= Object.keys(propChangesList) && ` ${Object.keys(propChangesList).join(",")}`+
		// Object.keys(stateChangesList) && ` ${Object.keys(stateChangesList).join(",")}`
		var changes = propsChanged.length && '> check: (' + propsChanged.join(",") + ')' || '';

		// if(!_isEmpty(stateChanges))console.info(`state changes:`, stateChanges)
		// if(!_isEmpty(propChanges))console.info(`prop changes:`, propChanges)
		if (!logger || logger === 'simple') {

			if (propsChanged) console.groupCollapsed && console.groupCollapsed('%c [' + stateType + '] %c ' + displayParentName + '.js %c>%c ' + displayName + '.js%c ' + changes, 'color: #5FB0B7', firstColor, secondColor, thirdColor, 'color: #525B76');
			if (!propsChanged) console.groupCollapsed && console.groupCollapsed('%c [' + stateType + '] %c ' + displayParentName + '.js %c>%c ' + displayName + '.js', 'color: #5FB0B7', firstColor, secondColor, thirdColor);
			console.groupCollapsed('%c props', 'color: #E43F6F');
			console.info('Before:', prevProps);
			console.info('After:', this.props);
			console.groupEnd();
			console.groupCollapsed('%c state', 'color: #F56476');
			console.info('Before:', prevState);
			console.info('After:', this.state);
			console.groupEnd();
			console.groupEnd && console.groupEnd();
		} else if (logger === 'groups') {
			console.groupCollapsed && console.groupCollapsed('%c [' + stateType + '] %c ' + displayParentName + ' %c>%c ' + displayName, 'color: #5FB0B7', firstColor, secondColor, thirdColor);

			console.groupCollapsed('%c message', 'color: #525B76');
			console.info('%c  ' + message, 'color:#6eb29c');
			console.groupEnd();
			console.groupCollapsed('%c props', 'color: #E43F6F');
			console.info('Before:', prevProps);
			console.info('After:', this.props);
			console.groupEnd();
			console.groupCollapsed('%c state', 'color: #F56476');
			console.info('Before:', prevState);
			console.info('After:', this.state);
			console.groupEnd();

			console.groupEnd && console.groupEnd();
		}
	};
}
var ReRenderWarnings = function ReRenderWarnings(React) {
	var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { logger: "simple" };

	React.Component.prototype.componentDidUpdate = createComponentDidUpdate(opts);
};
exports.default = ReRenderWarnings;