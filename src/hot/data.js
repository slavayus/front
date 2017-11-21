import React from 'react';
import ReactDOM from 'react-dom';
import './css/hot.css';
import Hot from './Hot';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

const data = [
    {img: 'poster-large.jpg'}
];

function search(entered = data, action) {
    return entered;
}

const store = createStore(search);


ReactDOM.render(
    <Provider store={store}>
        <Hot/>
    </Provider>,
    document.getElementById('context')
);