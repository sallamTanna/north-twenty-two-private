import {createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';


const saga = createSagaMiddleware();
const logger = createLogger();

const store = createStore(rootReducer, undefined , applyMiddleware(saga, logger));
  // saga.run(rootSaga);

export default store;
