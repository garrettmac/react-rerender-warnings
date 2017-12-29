
import _isString from 'lodash/isString'
import _isFunction from 'lodash/isFunction'
import _isEqual from 'lodash/isEqual'
// import _pick from 'lodash/pick'
import _omit from 'lodash/omit'
import lowbar from 'lowbar'

// constants
// ----------------

const DEFAULT_INCLUDE = /./
const DEFAULT_EXCLUDE = /[^a-zA-Z0-9]/
const UNAVOIDABLE = 'unavoidable'
const SHALLOW = 'Shallow'
const DEEP = 'Deep'
const FUNCTIONS = 'Function'

// utils
// ----------------
const toRegExp = s => _isString(s) ? new RegExp(`^${s}$`) : s
// convert to array
const toArray = o => o ? [].concat(o) : []
// get  component name
const getComponentName = o => lowbar.getFirstOf(o, ['constructor.displayName', 'constructor.name'])
// get parent component name
const getComponentParentName = o => lowbar.getFirstOf(o, ['_reactInternalFiber._debugOwner.stateNode.constructor.name', '_reactInternalFiber._debugOwner.stateNode.constructor.displayName', '_reactInternalFiber._debugOwner.stateNode.type', '_reactInternalInstance._currentElement._owner._instance.__proto__.constructor.displayName', '_reactInternalInstance._currentElement._owner._instance.__proto__.constructor.name', '_reactInternalInstance._currentElement._owner._instance.__proto__.displayName'])
//  react inlcude  path
const shouldInclude = (displayName) => {
	let include = toArray(DEFAULT_INCLUDE).map(toRegExp)
	let exclude = toArray(DEFAULT_EXCLUDE).map(toRegExp)
	return include.some(r => r.test(displayName)) && !exclude.some(r => r.test(displayName))
}

const isSameFunction = (prev, next) => [...prev, ...next].every(key => _isFunction(prev[key]) && _isFunction(next[key]) && prev[key].name === next[key].name);
// merge all keys

// get all changed keys
const changedKeys = (prev, next) => [...prev, ...next].filter(key => prev[key] !== next[key] && !_isEqual(prev[key], next[key]))



function createComponentDidUpdate({logger} ) {
	return function componentDidUpdate(prevProps, prevState) {
		const displayName = getComponentName(this);
		const displayParentName = getComponentParentName(this);

		if (!displayName || !prevProps || !this.props || !this.state || !prevState || !shouldInclude(displayName)) return;
		let propType;
		if (_isEqual(prevProps, this.props)) propType = DEEP;
		else if (prevProps === this.props) propType = SHALLOW;
		else if (changedKeys(prevState, this.state).every(isSameFunction)) stateType = FUNCTIONS; //_.pick(prev, changedKeys)

		let stateType;
		if (_isEqual(prevState, this.state)) stateType = DEEP;
		else if (prevState === this.state) stateType = SHALLOW;
		else if (changedKeys(prevState, this.state).every(isSameFunction)) stateType = FUNCTIONS; //_.pick(prev, changedKeys)

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

		let firstColor = 'color: #5FB0B7'
		let secondColor = 'color: #525B76'
		let thirdColor = 'color: #525B76'
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

		let message = "No Message"

		if (stateType === SHALLOW) message = `This is an avoidable re-render! Performs a reference comparison between two values to determine if they are equivalent. (goo.gl/nVgNxd)`
		else if (stateType === DEEP) message = `This is an avoidable re-render! Performs a deep comparison between two values to determine if they are equivalent. (https://goo.gl/RQxPCN)`
        else if (stateType === FUNCTIONS) message = `This is a possibly an avoidable re-render. Changes took place in functions only.`
        let propChangesList =_omit(this.props,Object.keys(prevProps))
        let stateChangesList =_omit(this.state,Object.keys(prevState))
        let propsChanged=[...Object.keys(propChangesList),...Object.keys(stateChangesList)]


            // let changes= Object.keys(propChangesList) && ` ${Object.keys(propChangesList).join(",")}`+
            // Object.keys(stateChangesList) && ` ${Object.keys(stateChangesList).join(",")}`
            let changes= propsChanged.length&&`> check: (${propsChanged.join(",")})`||''


        // if(!_isEmpty(stateChanges))console.info(`state changes:`, stateChanges)
        // if(!_isEmpty(propChanges))console.info(`prop changes:`, propChanges)
        if(!logger ||(logger === 'simple')){

            if(propsChanged)console.groupCollapsed && console.groupCollapsed(`%c [${stateType}] %c ${displayParentName}.js %c>%c ${displayName}.js%c ${changes}`, 'color: #5FB0B7', firstColor, secondColor, thirdColor, 'color: #525B76')
            if(!propsChanged)console.groupCollapsed && console.groupCollapsed(`%c [${stateType}] %c ${displayParentName}.js %c>%c ${displayName}.js`, 'color: #5FB0B7', firstColor, secondColor, thirdColor)
        console.groupCollapsed(`%c props`, 'color: #E43F6F')
		console.info(`Before:`, prevProps)
		console.info(`After:`, this.props)
        console.groupEnd();
        console.groupCollapsed(`%c state`, 'color: #F56476')
		console.info(`Before:`, prevState)
		console.info(`After:`, this.state)
		console.groupEnd();
        console.groupEnd && console.groupEnd();
        }else if(logger === 'groups'){
		console.groupCollapsed && console.groupCollapsed(`%c [${stateType}] %c ${displayParentName} %c>%c ${displayName}`, 'color: #5FB0B7', firstColor, secondColor, thirdColor)

		console.groupCollapsed(`%c message`, 'color: #525B76')
		console.info(`%c  ${message}`, 'color:#6eb29c')
		console.groupEnd();
		console.groupCollapsed(`%c props`, 'color: #E43F6F')
		console.info(`Before:`, prevProps)
		console.info(`After:`, this.props)
		console.groupEnd();
		console.groupCollapsed(`%c state`, 'color: #F56476')
		console.info(`Before:`, prevState)
		console.info(`After:`, this.state)
		console.groupEnd();

        console.groupEnd && console.groupEnd();
	}


	}
}
const ReRenderWarnings = (React, opts = {logger:"simple"}) => {
	React.Component.prototype.componentDidUpdate = createComponentDidUpdate(opts)
}
export default ReRenderWarnings;
