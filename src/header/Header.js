import React, {Component} from 'react';
import './css/header.css'
import './css/header_mobile.css'
import ProductStore from "../product/ProductStore";

import axios from 'axios'
import {serverPort} from "../etc/config.json"
import {apiPrefix} from "../etc/config.json";
import {stomp} from "../etc/config.json";
import Link from "react-router-dom/es/Link";
import Categories from "../categories/script/Categories";

const Stomp = require('stompjs');
const uniqueUserId = Date.now();

class Header extends Component {
    render() {
        return (
            <div>
                <div id="button_hidden">
                    <div className="logo_max">
                        <a href="//dbmast.ru/">Mr. Robot</a>
                    </div>
                    <input type="checkbox" id="nav-toggle" hidden/>
                    <nav className="nav">
                        <label htmlFor="nav-toggle" className="nav-toggle"/>
                        <h2 className="logo">
                            <Link to='/'> Mr. Robot</Link>
                        </h2>
                        <ul>
                            <li><a>Продукты</a></li>
                            <li><a href="#2">Акции</a></li>
                            <li><a href="#3">Сервис</a></li>
                            <li><a href="#4">Войти</a></li>
                            <li><input className='inputText' type="text" placeholder="Искать здесь..."
                                       onKeyPress={Header.searchClickMobile}/></li>
                        </ul>
                    </nav>
                </div>

                <div id="header">
                    <div className="logo_max">
                        <Link to='/'> Mr. Robot</Link>
                    </div>
                    <div id="elements">
                        <div className="action">Продукты
                            <Categories/>
                        </div>
                        <div className="action">Акции</div>
                        <div className="action">Сервис</div>
                    </div>
                    <div id="left">
                        <div id="enter" className="action">Войти</div>
                        <input type="text" placeholder="Искать здесь..." className='inputText'
                               onKeyPress={Header.searchClickFull}/>
                        <button type="submit" className="searchButton" onClick={Header.searchClickButton}/>
                    </div>
                </div>
            </div>);
    }

    static searchClickMobile(event) {
        if (event.key === 'Enter') {
            let mobileInputText = document.getElementsByClassName('inputText')[0];
            if (mobileInputText.value !== '') {
                Header.getProducts(mobileInputText.value);
            }
            mobileInputText.value = '';
        }
    }

    static searchClickFull(event) {
        if (event.key === 'Enter') {
            let fullInputText = document.getElementsByClassName('inputText')[1];
            if (fullInputText.value !== '') {
                Header.getProducts(fullInputText.value);
            }
            fullInputText.value = '';
        }
    }

    static getProducts(value) {

        axios.get(`${apiPrefix}:${serverPort}/products/search?text=${value}&queueId=${uniqueUserId}`)
            .then(function (response) {
                ProductStore.setUpMessage(response.data);
            })
            .catch(function (error) {
                ProductStore.setUpMessage(error);
            });

        Header.setUpConnection();

        console.log(value);
    }

    static searchClickButton() {
        let fullInputText = document.getElementsByClassName('inputText')[1];
        if (fullInputText.value !== '') {
            Header.getProducts(fullInputText.value);
        }
        fullInputText.value = '';
    }

    static setUpConnection() {

        const ws = new WebSocket('ws://127.0.0.1:15674/ws');
        const client = Stomp.over(ws);

        const listenTypeQueue = "/queue/products_" + uniqueUserId;

        function on_connect() {
            let headers = {'id': 'first', 'auto-delete': 'true', durable: false, exclusive: false};
            client.subscribe(listenTypeQueue, on_message, headers);
        }

        function on_connect_error(e) {
            ProductStore.setUpMessage(e);
        }

        function on_message(m) {
            let dataFromClient = JSON.parse(m.body);

            switch (dataFromClient.status) {
                case 'success': {
                    ProductStore.getStore().dispatch({type: 'LOAD', data: dataFromClient.data});
                    break;
                }
                case 'empty': {
                    ProductStore.setUpMessage('Нет таких товаров:(');
                    ProductStore.getStore().dispatch({type: 'CLEAR'});
                    break;
                }
                case 'error': {
                    ProductStore.getStore().dispatch({type: 'LOAD', data: dataFromClient.data});
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
    }

}

export default Header;
