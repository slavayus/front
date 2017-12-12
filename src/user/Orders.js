import React from 'react';
import cookie from 'react-cookies'
import "./css/user.css"
import OrderStore from "./store/OrderStore";
import Link from "react-router-dom/es/Link";
import '../product/css/product.css'

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
                    {this.state.products.data.map((item, index) => (
                        <Link to={`/snapshot/${item.products_snapshot.id}`} className='product' key={index}>
                            <img className="productImg"
                                 src={require(`../product/img/${item.products_snapshot.image_min_version}`)}
                                 alt={"YEE"}/>
                            <span className="productText">{item.products_snapshot.name}</span>
                            <span className="productPrice">{item.products_snapshot.price}</span>
                        </Link>
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