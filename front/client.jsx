import  React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import Layout from './pages/Layout';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';
import { createStore, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,compose(applyMiddleware(sagaMiddleware), composeWithDevTools()));

sagaMiddleware.run(rootSaga)

const Hot = hot(Layout);

ReactDOM.render(<Provider store={store}><Hot/></Provider>  , document.querySelector('#root'));