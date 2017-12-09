import React from 'react';
import {apiPrefix, serverPort} from "../etc/config.json"
import cookie from 'react-cookies'
import "./css/user.css"
import OrderStore from "./store/OrderStore";

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

    render() {
        return (
            this.state.products.status ?
                <div className='userMain'>
                    <ul>
                        {this.state.products.data.map((item, index) => (
                            <li key={index}>{item.products_snapshot.name}</li>
                        ))}
                    </ul>
                </div>
                : <div className="userMain">
                    <div id='empty'>
                        <span>{this.state.products.data}</span>
                    </div>
                </div>
        );
    }
});


export default Orders;