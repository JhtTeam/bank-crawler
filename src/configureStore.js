import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger'

export default function configureStore() {
    let store = createStore(reducers,
        applyMiddleware(
            thunk,
            promiseMiddleware(),
            logger,
        ));
    return store;
}