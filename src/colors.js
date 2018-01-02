import {
    SHALLOW,
    DEEP,
    FUNCTIONS,
} from './constants';
export const getColors = (stateType) => {

    let firstColor = 'color: #5FB0B7';
    let secondColor = 'color: #525B76';
    let thirdColor = 'color: #525B76';
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
    return {
        firstColor,
        secondColor,
        thirdColor
    }
}
