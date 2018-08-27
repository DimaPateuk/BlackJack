import { combineReducers } from 'redux-immutable';

import appReducer from 'ui/app/AppReducer';
import boxReducer from 'ui/Box/BoxReducer';

export default combineReducers({
	app: appReducer,
	box: boxReducer,
});
