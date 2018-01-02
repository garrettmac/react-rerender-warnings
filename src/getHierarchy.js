import lowbar from 'lowbar';
/**
 *  * Get component name
 *  * @method getComponentName
 */
export const getComponentName = o => lowbar.getFirstOf(o, ['constructor.displayName', 'constructor.name']);
/**
 *  * Get component parent name
 *  * @method getComponentParentName
 */

export const getComponentParentName = o => lowbar.getFirstOf(o, ['_reactInternalFiber._debugOwner.stateNode.constructor.name']); //, '_reactInternalFiber._debugOwner.stateNode.constructor.displayName', '_reactInternalFiber._debugOwner.stateNode.type', '_reactInternalInstance._currentElement._owner._instance.__proto__.constructor.displayName', '_reactInternalInstance._currentElement._owner._instance.__proto__.constructor.name', '_reactInternalInstance._currentElement._owner._instance.__proto__.displayName'])
/**
 *  * Get component grand parent name
 *  * @method getComponentGrandParentName
 */

export const getComponentGrandParentName = o => lowbar.getFirstOf(o, ['_reactInternalFiber._debugOwner.stateNode._reactInternalFiber._debugOwner.stateNode.constructor.name']);
/**
 *  * Get component getDisplayNames
 *  * @method getDisplayNames
 */

export const getDisplayNames = function(_this) {
    const displayName = getComponentName(_this) ? `%c ${getComponentName(_this)} %c>%c` : '';
    const displayParentName = getComponentParentName(_this) ? `%c ${getComponentParentName(_this)} >` : '';
    const displayGrandParentName = getComponentGrandParentName(_this) ? `%c ${getComponentGrandParentName(_this)} >` : '';
    return {displayName, displayParentName, displayGrandParentName};
}
