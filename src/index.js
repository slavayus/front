import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Product from "./product/Product";
import Categories from "./categories/script/Categories"


// const searchButton = document.getElementsByClassName("searchButton")[0];
// const element = document.getElementsByClassName("searchInput")[0];
// const list = document.getElementById("searchList");

import axios from 'axios'
// import {serverPort} from "./etc/config.json"
// import {apiPrefix} from "./etc/config.json";
//
// import {stomp} from "./etc/config.json";

const uniqueUserId = Date.now();
//
//
// axios.get(`${apiPrefix}:${serverPort}/products/all/${uniqueUserId}`)
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
//
//
// const Stomp = require('stompjs');
// const ws = new WebSocket('ws://127.0.0.1:15674/ws');
// const client = Stomp.over(ws);
//
//
// const listenProductQueue = "/queue/products_" + uniqueUserId;
//
// function on_connect() {
//     let headers = {'id': 'first', 'auto-delete': 'true', durable: false, exclusive: false};
//     console.log(listenProductQueue);
//     client.subscribe(listenProductQueue, on_message, headers);
// }
//
// function on_connect_error(e) {
//     console.log(e);
// }
//
// function on_message(m) {
//     console.log("YEE");
//     console.log(m);
// }
//
// client.connect(
//     stomp.mq_username,
//     stomp.mq_password,
//     on_connect,
//     on_connect_error,
//     stomp.mq_vhost
// );


const data = [{
    description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
    img: 'cover_min.jpg'
},
    {
        description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
        img: 'hoodie_min.jpg'
    },
    {
        description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
        img: 'poster_min.jpg'
    },
    {
        description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
        img: 'singlet_min.jpg'
    },
    {
        description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
        img: 'sweatshirt_min.jpg'
    },
    {
        description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
        img: 't-shirt_min.jpg'
    }
];

console.log(data);

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

ReactDOM.render(<Categories/>, document.getElementById('list'));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('context')
);

// ReactDOM.render(<Product/>, document.getElementById('context'));
