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

    loadMoreProducts: function () {
        HotStore.setSize(HotStore.getSize() + 1);
        HotStore.loadProducts();
    },

    scrollBottom: function () {
        window.scrollTo(0, document.body.scrollHeight);
    },

    scrollTop: function () {
        window.scrollTo(0, 0);
    },

    render() {
        let footer = this.state.products.data.length <= 2 ?
            <div>
                {HotStore.getEnd() ? <div/> : <button id={"loadMoreLittle"} type='submit' className='sendButton'
                                                      onClick={() => this.loadMoreProducts()}>Загрузить еще
                </button>}
                <footer id={"header"} className={"footerEmpty"}>
                    Copyright Vladislav Iusiumbeli 2017
                </footer>
            </div> :
            <div>
                {HotStore.getEnd() ? <div/> : <button id={"loadMoreALot"} type='submit' className='sendButton'
                                                      onClick={() => this.loadMoreProducts()}>Загрузить еще
                </button>}
                <footer id={"header"} className={"footerFill"}>
                    Copyright Vladislav Iusiumbeli 2017
                </footer>
            </div>;

        if (this.state.products.status) {
            return (
                <div>
                    {this.state.products.data.length < 2 ? <div/> :
                        <div>
                            <button type='submit' id={"scrollBottom"} className='sendButton'
                                    onClick={() => this.scrollBottom()}>Вниз
                            </button>
                            <button type='submit' id={"scrollTop"} className='sendButton'
                                    onClick={() => this.scrollTop()}>Вверх
                            </button>
                        </div>
                    }
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