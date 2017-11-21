import {createStore} from 'redux'

import axios from 'axios'
import {serverPort} from "../../etc/config.json"
import {apiPrefix} from "../../etc/config.json";
import {stomp} from "../../etc/config.json";

const Stomp = require('stompjs');

const CategoriesStore = {

    setUpConnection() {
        const ws = new WebSocket('ws://127.0.0.1:15674/ws');
        const client = Stomp.over(ws);

        const listenTypeQueue = "/queue/product_types";

        function on_connect() {
            let headers = {'id': 'first', 'auto-delete': 'true', durable: false, exclusive: false};
            client.subscribe(listenTypeQueue, on_message, headers);
        }

        function on_connect_error(e) {
            console.log(e);
        }

        function on_message(m) {
            let dataFromClient = JSON.parse(m.body);
            if (dataFromClient.status === 'success') {
                store.dispatch({type: 'LOAD', data: dataFromClient.data})
            }
        }

        client.connect(
            stomp.mq_username,
            stomp.mq_password,
            on_connect,
            on_connect_error,
            stomp.mq_vhost
        );

        axios.get(`${apiPrefix}:${serverPort}/products/alltypes/`)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    getCategories() {
        return {
            categories: store.getState()
        }
    },

    addChangeListener(callback) {
        store.subscribe(callback);
    },

    removeChangeListener(callback) {
        store.unsubscribe(callback);
    }
};


function categories(state = [{}], action) {
    if (action.type === 'LOAD') {
        return state = action.data;
    }
    return state;
}

const store = createStore(categories);


export default CategoriesStore;