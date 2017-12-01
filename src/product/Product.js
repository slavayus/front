import React from 'react';
import './css/product.css'
import Element from './Element'
import ProductStore from './ProductStore';
import ProductSort from "../sort/ProductSort";

const createReactClass = require('create-react-class');

const Product = createReactClass({
    getInitialState() {
        ProductStore.setUpConnection();
        ProductStore.loadProducts(this.props.type);
        return ProductStore.getProducts();
    },

    componentDidMount() {
        ProductStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        ProductStore.removeChangeListener();
    },

    onChange() {
        this.setState(ProductStore.getProducts())
    },

    render() {
        if (this.state.products.length !== 0) {
            return (
                <div className='main'>
                    <ProductSort/>
                    {this.state.products.map((item, index) => (
                        <Element key={index} item={item}/>
                    ))}
                </div>
            );
        } else {
            return (
                <div id='empty'>
                    <span>{ProductStore.getMessage()}</span>
                </div>
            )
        }
    }
});

export default Product;