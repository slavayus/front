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
        axios.post(`${apiPrefix}:${serverPort}/order?`, {
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

    render() {
        if (this.state.products.status) {
            return (
                <div className={"one"}>
                    <div className={"text_button"}>
                        <div id={"description"}>{this.state.products.data.description}</div>
                        <button type="submit" id="byButton" onClick={this.wantToBuy}>Купить</button>
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