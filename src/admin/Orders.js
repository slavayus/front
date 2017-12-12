import React from 'react';
import {apiPrefix, serverPort} from "../etc/config.json"
import OrderStore from "./store/OrderStore";
import '../product/css/product.css'
import axios from 'axios'

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
    },

    sent: function (data, id) {
        axios.get(`${apiPrefix}:${serverPort}/admin/orders/sent?orderId=${id}`);

        this.state.products.data.splice(data, 1);
        if (this.state.products.data.length === 0) {
            OrderStore.getStore().dispatch({type: 'CLEAR', data: 'Молодес, одмен. Список пуст.'});
        } else {
            OrderStore.getStore().dispatch({type: 'LOAD', data: this.state.products.data});
        }
    },

    render() {
        return (
            this.state.products.status ?
                <div className='productAdmin'>
                    <div className={"notSentOrders"} id={"tableTitle"}>
                        <div className={"notSentOrdersItem"}>Имя</div>
                        <div className={"notSentOrdersItem"}>Почта</div>
                        <div className={"notSentOrdersItem"}>Продукт</div>
                        <div className={"notSentOrdersPrice"}>Цена</div>
                        <div className={"notSentOrdersAction"}>Действие</div>
                    </div>
                    {this.state.products.data.map((item, index) => (
                        <div key={index} className={"notSentOrders"}>
                            <div className={"notSentOrdersItem"}>{item.user.name}</div>
                            <div className={"notSentOrdersItem"}>{item.user.email}</div>
                            <div className={"notSentOrdersItem"}>{item.products_snapshot.name}</div>
                            <div className={"notSentOrdersPrice"}>{item.products_snapshot.price}</div>
                            <button type='submit' className='sendButton'
                                    onClick={() => this.sent(index, item.id)}>Связался
                            </button>
                        </div>
                    ))}
                </div>
                : <div className="productAdmin">
                    <div id='emptyUser'>
                        <span>{this.state.products.data === 'Permission denied' ? this.props.history.push('/uups') : this.state.products.data}</span>
                    </div>
                </div>
        );
    }
});


export default Orders;