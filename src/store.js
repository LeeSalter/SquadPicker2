import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { save, load } from 'redux-localstorage-simple';

/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk, save({ states: ['team'], namespace: 'redux' }))); */

const store = createStore(reducer);

export default store;