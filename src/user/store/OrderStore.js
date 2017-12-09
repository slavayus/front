import {createStore} from 'redux'

import axios from 'axios'
import {apiPrefix, serverPort, stomp} from "../../etc/config.json"

const Stomp = require('stompjs');

const uniqueUserId = Date.now();

let unsubscribe;

const OrderStore = {
    getStore() {
        return store;
    },

    setUpConnection() {
        const ws = new WebSocket('ws://127.0.0.1:15674/ws');
        const client = Stomp.over(ws);

        const listenTypeQueue = "/queue/order_" + uniqueUserId;

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
                    store.dispatch({type: 'LOAD', data: dataFromClient.data});
                    break;
                }
                case 'empty': {
                    store.dispatch({type: 'CLEAR', data: 'У вас еще нет заказов:('});
                    break;
                }
                case 'error': {
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
        axios.get(`${apiPrefix}:${serverPort}/user/orders?queueId=${uniqueUserId}`, {withCredentials: true})
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


function products(state = {
    status: false,
    data: 'У вас еще нет заказов:('
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

const store = createStore(products);


export default OrderStore;