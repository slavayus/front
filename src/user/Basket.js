import React from 'react';
import cookie from 'react-cookies'
import "./css/user.css"
import BasketStore from "./store/BasketStore";
import Element from "../product/Element";
import axios from "axios/index";
import {apiPrefix, serverPort} from "../etc/config";
import Link from "react-router-dom/es/Link";


const createReactClass = require('create-react-class');


const Basket = createReactClass({

    getInitialState() {
        BasketStore.setUpConnection();
        BasketStore.loadProducts();
        return BasketStore.getProducts();
    },

    componentWillUnmount() {
        BasketStore.removeChangeListener();
    },

    onChange() {
        this.setState(BasketStore.getProducts())
    },

    componentDidMount() {
        BasketStore.addChangeListener(this.onChange);
        if (!cookie.load('user')) {
            this.props.history.push('/login');
        }
    },

    byAllProducts: function () {
        axios.post(`${apiPrefix}:${serverPort}/order/basket?`, {
            productsId: Array.from(cookie.load('basket'))
        }, {withCredentials: true}).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    },

    calculateTotalPrice: function () {
        let totalPrice = 0;
        BasketStore.getStore().getState().data.forEach(value => totalPrice += value.price);
        return totalPrice;
    },

    render() {
        return (
            this.state.products.status ?
                <div className='userMain'>
                    <div id={"byAllProducts"}>
                        <Link to={'/checkorder'}>
                            <span onClick={() => this.byAllProducts()}>Купить все продукты</span>
                        </Link>
                        <label> </label>
                        <span>Общая цена: {this.calculateTotalPrice()}</span>
                    </div>
                    {this.state.products.data.map((item, index) => (
                        <Element key={index} item={item}/>
                    ))}
                </div>
                : <div className="userMain">
                    <div id='emptyUser'>
                        <span>{this.state.products.data}</span>
                    </div>
                </div>
        );
    }
});


export default Basket;