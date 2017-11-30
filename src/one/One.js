import React from 'react';
import OneStore from "./OneStore";
import "./css/one.css";
import Link from "react-router-dom/es/Link";

const createReactClass = require('create-react-class');

const One = createReactClass({
    getInitialState() {
        OneStore.setUpConnection();
        OneStore.loadProducts(this.props.match.params.id);
        return OneStore.getProducts();
    },

    componentDidMount() {
        OneStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        OneStore.removeChangeListener();
    },

    onChange() {
        this.setState(OneStore.getProducts())
    },

    render() {
        if (this.state.products.status) {
            return (
                    <div className={"one"}>
                        <div className={"text_button"}>
                            <div id={"description"}>{this.state.products.data.description}</div>
                            <Link to={'/products'} id={"button_link"}>
                                <button type="submit" id="byButton">Купить</button>
                            </Link>
                        </div>
                        <img className={"oneImg"} src={require(`./img/${this.state.products.data.image_large_version}`)}
                             alt={"YEE"}/>
                    </div>
            );
        } else {
            return (
                <div id='empty'>
                    <span>{this.state.products.data}</span>
                </div>
            )
        }
    }
});

export default One;