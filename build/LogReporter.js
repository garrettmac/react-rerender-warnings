'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMessage = exports.chalk = undefined;

var _constants = require('./constants');

var chalk = exports.chalk = {
    blue: 'color: #E43F6F'
    // export const info = (...args) => console.info(args.join(''), 'color: #525B76');

    // export const log = (...args) => console.log(args.join(''), 'color: #525B76');

    // export const group = (...args) => console.group(args.join(''), 'color: #525B76');

    // export const groupCollapsed = (...args) => console.group(args.join(''), 'color: #525B76');

};var getMessage = exports.getMessage = function getMessage(stateType) {
    var message = 'No Message';
    if (stateType === _constants.SHALLOW) message = 'This is an avoidable re-render! Performs a reference comparison between two values to determine if they are equivalent. (goo.gl/nVgNxd)';else if (stateType === _constants.DEEP) message = 'This is an avoidable re-render! Performs a deep comparison between two values to determine if they are equivalent. (https://goo.gl/RQxPCN)';else if (stateType === _constants.FUNCTIONS) message = 'This is a possibly an avoidable re-render. Changes took place in functions only.';
    return message;
};

var LogReporter = function LogReporter(_ref) {
    var stateType = _ref.stateType,
        hierarchyLogString = _ref.hierarchyLogString,
        props = _ref.props,
        changes = _ref.changes,
        state = _ref.state,
        prevProps = _ref.prevProps,
        prevState = _ref.prevState,
        keysRemoved = _ref.keysRemoved,
        keysAdded = _ref.keysAdded,
        keysChanged = _ref.keysChanged,
        stateColors = _ref.stateColors,
        propColors = _ref.propColors,
        stateMessage = _ref.stateMessage,
        propMessage = _ref.propMessage;
    var stateFirstColor = stateColors.firstColor,
        stateSecondColor = stateColors.secondColor,
        stateThirdColor = stateColors.thirdColor;
    var propFirstColor = propColors.firstColor,
        propSecondColor = propColors.secondColor,
        propThirdColor = propColors.thirdColor;
    // TODO: find a way to seperate

    var firstColor = propFirstColor || stateFirstColor;
    var secondColor = propSecondColor || stateSecondColor;
    var thirdColor = propThirdColor || stateThirdColor;
    var str = void 0;

    if (!changes) str = ' [' + stateType + '] ' + hierarchyLogString;
    if (!changes) console.groupCollapsed && console.groupCollapsed(' [' + stateType + '] ' + hierarchyLogString, 'color: #5FB0B7', firstColor, secondColor, thirdColor);

    if (changes) str = ' [' + stateType + ']   ' + hierarchyLogString + ' ' + changes;
    if (changes) console.groupCollapsed && console.groupCollapsed(str, 'color: #5FB0B7', firstColor, secondColor, thirdColor, 'color: #525B76');

    console.groupCollapsed('%c props', 'color: #E43F6F');
    console.info('Message:', propMessage);
    console.info('Before:', prevProps);
    console.info('After:', props);
    console.groupEnd();

    console.groupCollapsed('%c state', 'color: #F56476');
    console.info('Message:', stateMessage);
    console.info('Before:', prevState);
    console.info('After:', state);
    console.groupEnd();

    console.groupEnd && console.groupEnd();
};
exports.default = LogReporter;