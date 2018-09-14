import { combineReducers } from 'redux-immutable';

import appReducer from 'ui/app/AppReducer';
import boxReducer from 'ui/Box/BoxReducer';
import DetectedResultReducer from 'ui/DetectedResult/DetectedResultReducer';

export default combineReducers({
	app: appReducer,
	box: boxReducer,
	detectedResult: DetectedResultReducer,
});
