import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {createStore} from 'redux'


const searchButton = document.getElementsByClassName("searchButton")[0];
const element = document.getElementsByClassName("searchInput")[0];
const list = document.getElementById("searchList");


const data = [{
    description: 'Чехол Мистер Робот / Mr.Robot для Huawei P 6/7/8/9/10, Lite/Plus, Honor 6/7/8/4C/4X/G7',
    img: './img/image.jpg'
},
    {
        description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
        img: './img/poster.jpg'
    }
];

function search(entered = data, action) {
    /*if (action.type === 'addSearch') {
        return [
            ...entered,
            action.search
        ]
    }*/

    return entered;
}

const store = createStore(search);


/*
store.subscribe(() => {
    list.innerHTML = '';
    store.getState().forEach(listElement => {
        const li = document.createElement('li');
        li.textContent = listElement;
        list.appendChild(li)
    });
    element.value = '';
});


function pressed() {
    store.dispatch({type: 'addSearch', search: element.value});
}

element.onkeydown = function (e) {
    if (e.keyCode === 13) {
        pressed();
    }
};

searchButton.addEventListener('click', () => {
    pressed();
});
*/


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('searchList')
);