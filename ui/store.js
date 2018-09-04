import { createStore, applyMiddleware, compose } from 'redux';
import Middlewares from 'ui/middlewares';

import reducer from './reducer';

console.log(Middlewares);
export const store = createStore(
	reducer,
	compose(applyMiddleware(...Middlewares))
);

export default store;
