'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getColors = undefined;

var _constants = require('./constants');

var getColors = exports.getColors = function getColors(stateType) {

    var firstColor = 'color: #5FB0B7';
    var secondColor = 'color: #525B76';
    var thirdColor = 'color: #525B76';
    if (stateType === _constants.SHALLOW) {
        firstColor = 'color: #F3B3A6';
        secondColor = 'color: #B98B82';
        thirdColor = 'color: #E4959E';
    }
    if (stateType === _constants.DEEP) {
        firstColor = 'color: #F56476';
        secondColor = 'color: #d76476';
        thirdColor = 'color: #c36476';
    }
    if (stateType === _constants.FUNCTIONS) {
        firstColor = 'color: #ADA8BE';
        secondColor = 'color: #C6CAED';
        thirdColor = 'color: #A28497';
    }
    return {
        firstColor: firstColor,
        secondColor: secondColor,
        thirdColor: thirdColor
    };
};