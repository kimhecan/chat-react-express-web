import  React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

import Layout from './Layout';
import rootReducer from '../reducers';
import rootSaga from '../sagas';



const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,compose(applyMiddleware(sagaMiddleware), composeWithDevTools()));

sagaMiddleware.run(rootSaga)

const Hot = hot(Layout);

ReactDOM.render(<Provider store={store}><Hot/></Provider>  , document.querySelector('#root'));