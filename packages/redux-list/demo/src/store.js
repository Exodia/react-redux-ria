import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer} from '@react-redux-ria/redux-list';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';


const store = createStore(
  combineReducers({list: reducer}),
  applyMiddleware(thunk, createLogger())
);

export default store;
