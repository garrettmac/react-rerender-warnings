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

var _intersection2 = require('lodash/intersection');

var _intersection3 = _interopRequireDefault(_intersection2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _lowbar = require('lowbar');

var _lowbar2 = _interopRequireDefault(_lowbar);

var _getChangedKeys = require('./getChangedKeys');

var _getHierarchy = require('./getHierarchy');

var _constants = require('./constants');

var _utils = require('./utils');

var _colors = require('./colors');

var _LogReporter = require('./LogReporter');

var _LogReporter2 = _interopRequireDefault(_LogReporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// import _pick from 'lodash/pick';


// constants
// ----------------


function createComponentDidUpdate(_ref) {
  var logger = _ref.logger;

  return function componentDidUpdate(prevProps, prevState) {
    var _getDisplayNames = (0, _getHierarchy.getDisplayNames)(this),
        displayName = _getDisplayNames.displayName,
        displayParentName = _getDisplayNames.displayParentName,
        displayGrandParentName = _getDisplayNames.displayGrandParentName;

    try {

      // if (!displayName || !prevProps || !this.props || !this.state || !prevState || !shouldInclude(displayName)) return;
      if (!displayName || !prevProps || !this.props || !this.state || !prevState || (0, _utils.shouldInclude)(displayName)) return;
      // if (!displayName) return;
      // if (!displayName || (!prevProps || this.props) || (!this.state || !prevState) || !shouldInclude(displayName)) return;

      var classifer = function classifer(prev, next) {
        var groupType = void 0;
        if ((0, _isEqual3.default)(prev, next)) groupType = _constants.DEEP;else if (prev === next) groupType = _constants.SHALLOW;else if ((0, _utils.changedKeys)(prev, next).every(_utils.isSameFunction)) groupType = _constants.FUNCTIONS; //_.pick(prev, changedKeys)
        return groupType;
      };

      var propType = classifer(prevProps, this.props);
      var stateType = classifer(prevState, this.state);

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

      var stateColors = (0, _colors.getColors)(stateType);

      var propColors = (0, _colors.getColors)(propType);

      var stateMessage = (0, _LogReporter.getMessage)(stateType);
      var propMessage = (0, _LogReporter.getMessage)(propType);

      // TODO change how theses are managed and displayed.
      var propChangesList = (0, _omit3.default)(this.props, Object.keys(prevProps || {}));
      var stateChangesList = (0, _omit3.default)(this.state, Object.keys(prevState || {}));
      var allChanged = [].concat(_toConsumableArray(Object.keys(propChangesList)), _toConsumableArray(Object.keys(stateChangesList)));

      var changes = allChanged.length && '> check: (' + allChanged.join(',') + ')' || '';
      // if(!_isEmpty(stateChanges))console.info(`state changes:`, stateChanges); // may be able to still use.
      var hierarchyLogString = displayName.slice().concat(displayParentName).concat(displayGrandParentName);

      var keysRemoved = (0, _getChangedKeys.getKeysRemoved)(prevState, this.state);
      var keysAdded = (0, _getChangedKeys.getKeysAdded)(prevState, this.state);
      var keysChanged = (0, _intersection3.default)(keysAdded, keysRemoved);
      (0, _LogReporter2.default)({
        props: this.props,
        state: this.state,
        propsDiff: propsDiff,
        stateDiff: stateDiff,
        stateColors: stateColors,
        changes: changes,
        stateMessage: stateMessage,
        propMessage: propMessage,
        propColors: propColors,
        stateType: stateType,
        hierarchyLogString: hierarchyLogString
      });
    } catch (e) {
      console.error(e);
    }
  };
}
var ReRenderWarnings = function ReRenderWarnings(React) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  React.Component.prototype.componentDidUpdate = createComponentDidUpdate(opts);
};
exports.default = ReRenderWarnings;