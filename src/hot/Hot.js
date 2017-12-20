import React from 'react';
import "./css/hot.css";
import HotStore from "./HotStore";
import HotElement from "./HotElement";
import Link from "react-router-dom/es/Link";
import '../header/css/header.css'

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
        let footer = this.state.products.data.length <= 2 ?
            <footer id={"header"} className={"footerEmpty"}>
                Copyright Vladislav Iusiumbeli 2017
            </footer> :
            <footer id={"header"} className={"footerFill"}>
                Copyright Vladislav Iusiumbeli 2017
            </footer>;
        if (this.state.products.status) {
            return (
                <div>
                    <div id={"main"}>
                        {this.state.products.data.map((item, index) => (
                            <Link to={`/products/${item.product.id}`} key={index} id='hotLink'>
                                <HotElement key={index} item={item} id={index}/>
                            </Link>
                        ))}
                    </div>
                    {footer}
                </div>
            );
        } else {
            return (
                <div>
                    <div id='empty'>
                        {console.log(this.state.products.data)}
                        <span>{this.state.products.data}</span>
                    </div>
                    <footer id={"header"} className={"footerEmpty"}>
                        Copyright Vladislav Iusiumbeli 2017
                    </footer>
                </div>
            )
        }
    }
});

export default Hot;