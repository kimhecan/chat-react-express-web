import  React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import Layout from './Layout';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const Hot = hot(Layout);

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(<Provider store={store}><Hot/></Provider>  , document.querySelector('#root'));