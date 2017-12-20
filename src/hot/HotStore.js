import {createStore} from 'redux'

import axios from 'axios'
import {apiPrefix, serverPort, stomp, webSocket} from "../etc/config.json"

const Stomp = require('stompjs');

const uniqueUserId = Date.now();

let unsubscribe;

let size = 1;

let end = false;

const HotStore = {
    getStore() {
        return store;
    },

    getSize() {
        return size;
    },

    setSize(newSize) {
        size = newSize;
    },

    getEnd(){
        return end
    },

    setUpConnection() {

        const ws = new WebSocket(webSocket);
        const client = Stomp.over(ws);

        const listenTypeQueue = "/queue/products_" + uniqueUserId;

        function on_connect() {
            let headers = {'id': 'first', 'auto-delete': 'true', durable: false, exclusive: false};
            client.subscribe(listenTypeQueue, on_message, headers);
        }

        function on_connect_error(e) {
            store.dispatch({type: 'CLEAR', data: e});
        }

        function on_message(m) {
            let dataFromClient = JSON.parse(m.body);

            switch (dataFromClient.status) {
                case 'success': {
                    end = dataFromClient.end;
                    store.dispatch({type: 'LOAD', data: dataFromClient.data});
                    break;
                }
                case 'empty': {
                    end = true;
                    store.dispatch({type: 'CLEAR', data: "Нет таких товаров:(\n Возварщайтесь в другой раз"});
                    break;
                }
                case 'error': {
                    end = true;
                    store.dispatch({type: 'CLEAR', data: dataFromClient.data});
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

    loadProducts() {
        axios.get(`${apiPrefix}:${serverPort}/?queueId=${uniqueUserId}&size=${size}`)
            .then(function (response) {
                store.dispatch({type: 'CLEAR', data: response.data});
            })
            .catch(function (error) {
                store.dispatch({type: 'CLEAR', data: error});
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


function hot(state = {
    status: false,
    data: "Нет таких товаров:(\n Возварщайтесь в другой раз"
}, action) {
    switch (action.type) {
        case 'LOAD':
            return {
                status: true,
                data: action.data
            };
        case 'CLEAR':
            return {
                status: false,
                data: action.data
            };
        default :
            return state;
    }
}

const store = createStore(hot);


export default HotStore;