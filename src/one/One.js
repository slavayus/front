import React from 'react';
import OneStore from "./OneStore";
import "./css/one.css";
import cookie from 'react-cookies'
import axios from 'axios'
import {apiPrefix, serverPort} from "../etc/config.json"


const createReactClass = require('create-react-class');

const messageConfirm = 'Вы действительно желаете приобрести этот товар?';

const One = createReactClass({
    getInitialState() {
        OneStore.setUpConnection();
        OneStore.loadProducts(this.props.match.params.id);
        return OneStore.getProducts();
    },

    componentDidMount() {
        OneStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        OneStore.removeChangeListener();
    },

    onChange() {
        this.setState(OneStore.getProducts())
    },

    buyThisProduct: function () {
        axios.post(`${apiPrefix}:${serverPort}/order`, {
            productId: this.state.products.data.id
        }, {withCredentials: true}).then(function (response) {
            alert(response.data);
        }).catch(function (error) {
            alert(error);
        });
    },

    wantToBuy: function () {
        if (cookie.load('user')) {
            let result = window.confirm(messageConfirm);
            if (result) {
                this.buyThisProduct();
            }
        } else {
            this.props.history.push('/login');
        }
    },

    addToBasket: function () {
        if (cookie.load('user')) {
            if (cookie.load('basket')) {
                let array = Array.from(cookie.load('basket'));
                if (!array.includes(this.state.products.data.id)) {
                    array.push(this.state.products.data.id);
                }
                cookie.save('basket', array);
            } else {
                cookie.save('basket', [this.state.products.data.id]);
            }
        } else {
            this.props.history.push('/login');
        }
        this.setState(OneStore.getProducts());
    },

    deleteFromBasket: function () {
        if (cookie.load('user')) {
            let array = Array.from(cookie.load('basket'));
            let index = array.indexOf(this.state.products.data.id);
            if (index >= 0) {
                array.splice(index, 1);
            }
            cookie.save('basket', array);
        } else {
            this.props.history.push('/login');
        }
        this.setState(OneStore.getProducts());
    },

    render() {
        let addToBasket = <button type="submit" id="byButton" onClick={this.addToBasket}>Добавить в
            корзину</button>;
        if ((cookie.load('basket') !== undefined) && (Array.from(cookie.load('basket')).includes(this.state.products.data.id))) {
            addToBasket = <button type="submit" id="byButton" onClick={this.deleteFromBasket}>Удалить из
                корзины</button>;
        }

        if (this.state.products.status) {
            return (
                <div className={"one"}>
                    <div className={"text_button"}>
                        <div id={"description"}>{this.state.products.data.description}</div>
                        <div className={'buyAndBasket'}>
                            <button type="submit" id="byButton" onClick={this.wantToBuy}>Купить</button>
                            {addToBasket}
                        </div>
                    </div>
                    <img className={"oneImg"} src={require(`./img/${this.state.products.data.image_large_version}`)}
                         alt={"YEE"}/>
                </div>
            );
        } else {
            return (
                <div id='empty'>
                    <span>{this.state.products.data}</span>
                </div>
            )
        }
    }
});

export default One;