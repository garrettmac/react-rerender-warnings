import {
    SHALLOW,
    DEEP,
    FUNCTIONS,
} from './constants';
export const chalk = {
    blue: 'color: #E43F6F'
}
// export const info = (...args) => console.info(args.join(''), 'color: #525B76');

// export const log = (...args) => console.log(args.join(''), 'color: #525B76');

// export const group = (...args) => console.group(args.join(''), 'color: #525B76');

// export const groupCollapsed = (...args) => console.group(args.join(''), 'color: #525B76');

export const getMessage = (stateType) => {
    let message = 'No Message';
    if (stateType === SHALLOW) message = 'This is an avoidable re-render! Performs a reference comparison between two values to determine if they are equivalent. (goo.gl/nVgNxd)';
    else if (stateType === DEEP) message = 'This is an avoidable re-render! Performs a deep comparison between two values to determine if they are equivalent. (https://goo.gl/RQxPCN)';
    else if (stateType === FUNCTIONS) message = 'This is a possibly an avoidable re-render. Changes took place in functions only.';
    return message;
};



const LogReporter = ({
    stateType,
    hierarchyLogString,
    props,
    changes,
    state,
    prevProps,
    prevState,
    keysRemoved,
    keysAdded,
    keysChanged,
    stateColors,
    propColors,
    stateMessage,
    propMessage
}) => {
    let {
        firstColor: stateFirstColor,
        secondColor: stateSecondColor,
        thirdColor: stateThirdColor
    } = stateColors;
    let {
        firstColor: propFirstColor,
        secondColor: propSecondColor,
        thirdColor: propThirdColor
    } = propColors;
    // TODO: find a way to seperate
    let firstColor = propFirstColor || stateFirstColor;
    let secondColor = propSecondColor || stateSecondColor;
    let thirdColor = propThirdColor || stateThirdColor;
    let str;

    if (!changes) str = ` [${stateType}] ${hierarchyLogString}`;
    if (!changes) console.groupCollapsed && console.groupCollapsed(` [${stateType}] ${hierarchyLogString}`, 'color: #5FB0B7', firstColor, secondColor, thirdColor)

    if (changes) str = ` [${stateType}]   ${hierarchyLogString} ${changes}`;
    if (changes) console.groupCollapsed && console.groupCollapsed(str, 'color: #5FB0B7', firstColor, secondColor, thirdColor, 'color: #525B76')

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
export default LogReporter;
