import {createStore} from 'redux'

import axios from 'axios'
import {serverPort} from "../etc/config.json"
import {apiPrefix} from "../etc/config.json";
import {stomp} from "../etc/config.json";

const Stomp = require('stompjs');

const uniqueUserId = Date.now();

let message = 'Нет такого товара:(';

let unsubscribe;

const OneStore = {
    getStore() {
        return store;
    },

    getMessage() {
        return message;
    },

    setUpConnection() {

        const ws = new WebSocket('ws://127.0.0.1:15674/ws');
        const client = Stomp.over(ws);

        const listenTypeQueue = "/queue/element_" + uniqueUserId;

        function on_connect() {
            let headers = {'id': 'first', 'auto-delete': 'true', durable: false, exclusive: false};
            client.subscribe(listenTypeQueue, on_message, headers);
        }

        function on_connect_error(e) {
            message = e;
            store.dispatch({type: 'CLEAR'});
        }

        function on_message(m) {
            let dataFromClient = JSON.parse(m.body);

            switch (dataFromClient.status) {
                case 'success': {
                    store.dispatch({type: 'LOAD', data: dataFromClient.data});
                    break;
                }
                case 'empty': {
                    message = 'Нет такого товара:(';
                    store.dispatch({type: 'CLEAR'});
                    break;
                }
                case 'error': {
                    message = dataFromClient.data;
                    store.dispatch({type: 'CLEAR'});
                    break;
                }
                default: {
                }
            }
        }

        client.connect(
            stomp.mq_username,
            stomp.mq_password,
            on_connect,
            on_connect_error,
            stomp.mq_vhost
        );
    },

    loadProducts(id) {
        axios.get(`${apiPrefix}:${serverPort}/product/${id}?queueId=${uniqueUserId}`)
            .then(function (response) {
                message = response.data;
            })
            .catch(function (error) {
                message = error;
            });
    },

    getProducts() {
        return {
            products: store.getState()
        }
    },

    addChangeListener(callback) {
        unsubscribe = store.subscribe(callback);
    },

    removeChangeListener() {
        unsubscribe();
    }
};


function products(state = [], action) {
    switch (action.type) {
        case 'LOAD':
            return state = action.data;
        case 'CLEAR':
            return state = [];
        default :
            return state;
    }
}

const store = createStore(products);


export default OneStore;