import React from 'react';
import "./css/hot.css";
import HotStore from "./HotStore";
import HotElement from "./HotElement";
import Link from "react-router-dom/es/Link";

const createReactClass = require('create-react-class');

const Hot = createReactClass({
    getInitialState() {
        HotStore.setUpConnection();
        HotStore.loadProducts();
        return HotStore.getProducts();
    },

    componentDidMount() {
        HotStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        HotStore.removeChangeListener();
    },

    onChange() {
        this.setState(HotStore.getProducts())
    },

    render() {
        if (this.state.products.status) {
            return (
                <div id={"main"}>
                    {this.state.products.data.map((item, index) => (
                        <Link to={`/products/${item.product.id}`} key={index} id='hotLink'>
                            <HotElement key={index} item={item} id={index}/>
                        </Link>
                    ))}
                </div>
            );
        } else {
            return (
                <div id='empty'>
                    {console.log(this.state.products.data)}
                    <span>{this.state.products.data}</span>
                </div>
            )
        }
    }
});

export default Hot;