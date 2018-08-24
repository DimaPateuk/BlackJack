import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducer';

export const store = createStore(
	reducer,
);

export default store;
