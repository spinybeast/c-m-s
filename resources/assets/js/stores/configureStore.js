import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

let createStoreWithMiddleware;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);
} else {
    createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
}

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}