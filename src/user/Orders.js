import React from 'react';
import cookie from 'react-cookies'
import "./css/user.css"
import OrderStore from "./store/OrderStore";
import Link from "react-router-dom/es/Link";
import '../product/css/product.css'
import Progress from "react-progressbar"
import {apiPrefix, serverPort} from "../etc/config";
import axios from "axios/index";

const createReactClass = require('create-react-class');


const Orders = createReactClass({

    getInitialState() {
        OrderStore.setUpConnection();
        OrderStore.loadProducts();
        return OrderStore.getProducts();
    },

    componentWillUnmount() {
        OrderStore.removeChangeListener();
    },

    onChange() {
        this.setState(OrderStore.getProducts())
    },

    componentDidMount() {
        OrderStore.addChangeListener(this.onChange);
        if (!cookie.load('user')) {
            this.props.history.push('/login');
        }
    },

    confirmOrder: function (item) {
        axios.post(`${apiPrefix}:${serverPort}/order/confirm`, {
            id: item.products_snapshot.id
        }).then(function (response) {
            if (response = 'sucess') {
                OrderStore.loadProducts();
            }
        }).catch(function (error) {
            console.log(error);
        });
    },

    render() {
        return (
            this.state.products.status ?
                <div className='userMain' id={'userOrders'}>
                    {this.state.products.data.map((item, index) => (
                        <div className={"userOrderConfirm"} key={index}>
                            <Link to={`/snapshot/${item.products_snapshot.id}`}>
                                <div className='product' key={index}>
                                    <img className="productImg"
                                         src={require(`../product/img/${item.products_snapshot.image_min_version}`)}
                                         alt={"YEE"}/>
                                    <span className="productText">{item.products_snapshot.name}</span>
                                    <span className="productPrice">{item.products_snapshot.price}</span>
                                </div>
                            </Link>
                            <div className={'confirmOrderBlock'}>
                                <div>
                                    <Progress
                                        completed={((((Math.floor(Date.now() / 1000 / 60) - Math.floor(item.products_snapshot.posted / 1000 / 60)) * 25) > 75) && (item.products_snapshot.delivered))
                                            ? 100 :
                                            ((((Math.floor(Date.now() / 1000 / 60) - Math.floor(item.products_snapshot.posted / 1000 / 60)) * 25) > 75) && (!item.products_snapshot.delivered))
                                                ? 75 :
                                                ((Math.floor(Date.now() / 1000 / 60) - Math.floor(item.products_snapshot.posted / 1000 / 60)) * 25) > 100
                                                    ? 100
                                                    : ((Math.floor(Date.now() / 1000 / 60) - Math.floor(item.products_snapshot.posted / 1000 / 60)) * 25)}
                                        className={'progressBar'} color={'#fff'} height={3}
                                        border-radius={'2px'}/>
                                </div>
                                <div id={'breakPoints'}>
                                    <div>|</div>
                                    <div>|</div>
                                    <div>|</div>
                                    <div>|</div>
                                </div>
                                <div id={'breakPoints'}>
                                    <div>Отправлен</div>
                                    <div>В пути</div>
                                    <div>Доставлен</div>
                                    <div>Получен</div>
                                </div>
                                <button type='submit' className='sendButton' id={"confirmOrder"}
                                        onClick={() => this.confirmOrder(item)}>Подтвердить
                                    получение
                                </button>
                            </div>
                        </div>
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


export default Orders;