import React from 'react';
import cookie from 'react-cookies'
import "./css/user.css"
import BasketStore from "./store/BasketStore";
import Element from "../product/Element";
import '../product/css/product.css'


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

    render() {
        return (
            this.state.products.status ?
                <div className='userMain'>
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