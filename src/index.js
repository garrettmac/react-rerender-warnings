import _isString from 'lodash/isString';
import _isFunction from 'lodash/isFunction';
import _isEqual from 'lodash/isEqual';
import _intersection from 'lodash/intersection';
// import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import lowbar from 'lowbar';

import {
  getChangedKeys,
  getKeysAdded,
  getKeysRemoved
} from './getChangedKeys';

import {
  getComponentName,
  getComponentParentName,
  getComponentGrandParentName,
  getDisplayNames,
} from './getHierarchy';
import {
  DEFAULT_INCLUDE,
  DEFAULT_EXCLUDE,
  UNAVOIDABLE,
  SHALLOW,
  DEEP,
  FUNCTIONS,
} from './constants';
import {
  toRegExp,
  toArray,
  shouldInclude,
  isSameFunction,
  changedKeys,
} from './utils';
import {
  getColors
} from './colors';
import LogReporter, {
  getMessage,
  info,
  log,
  group,
  groupCollapsed,
} from './LogReporter';
// constants
// ----------------







function createComponentDidUpdate({
  logger
}) {
  return function componentDidUpdate(prevProps, prevState) {

    const {
      displayName,
      displayParentName,
      displayGrandParentName
    } = getDisplayNames(this);
    try {



      // if (!displayName || !prevProps || !this.props || !this.state || !prevState || !shouldInclude(displayName)) return;
      if (!displayName || !prevProps || !this.props || !this.state || !prevState || shouldInclude(displayName)) return;
      // if (!displayName) return;
      // if (!displayName || (!prevProps || this.props) || (!this.state || !prevState) || !shouldInclude(displayName)) return;

      const classifer = function(prev, next) {
        let groupType;
        if (_isEqual(prev, next)) groupType = DEEP;
        else if (prev === next) groupType = SHALLOW;
        else if (changedKeys(prev, next).every(isSameFunction)) groupType = FUNCTIONS; //_.pick(prev, changedKeys)
        return groupType;
      };

      const propType = classifer(prevProps, this.props);
      const stateType = classifer(prevState, this.state);



      if (!propType || !stateType) return;

      // ----------
      const propsDiff = {
        prev: prevProps,
        next: this.props,
        name: displayName,
        parentName: displayParentName
      };
      const stateDiff = {
        prev: prevState,
        next: this.state,
        name: displayName,
        parentName: displayParentName
      };


      const stateColors = getColors(stateType);

      const propColors = getColors(propType);


      const stateMessage = getMessage(stateType);
      const propMessage = getMessage(propType);


      // TODO change how theses are managed and displayed.
      let propChangesList = _omit(this.props, Object.keys(prevProps || {}));
      let stateChangesList = _omit(this.state, Object.keys(prevState || {}));
      let allChanged = [...Object.keys(propChangesList), ...Object.keys(stateChangesList)];


      let changes = allChanged.length && `> check: (${allChanged.join(',')})` || '';
      // if(!_isEmpty(stateChanges))console.info(`state changes:`, stateChanges); // may be able to still use.
      const hierarchyLogString = displayName.slice().concat(displayParentName).concat(displayGrandParentName);


      const keysRemoved = getKeysRemoved(prevState, this.state);
      const keysAdded = getKeysAdded(prevState, this.state);
      const keysChanged = _intersection(keysAdded, keysRemoved);
      LogReporter({
        props: this.props,
        state: this.state,
        propsDiff,
        stateDiff,
        stateColors,
        changes,
        stateMessage,
        propMessage,
        propColors,
        stateType,
        hierarchyLogString
      });

    } catch (e) {
      console.error(e)
    }
  };
}
const ReRenderWarnings = (React, opts = {}) => {
  React.Component.prototype.componentDidUpdate = createComponentDidUpdate(opts);
};
export default ReRenderWarnings;
