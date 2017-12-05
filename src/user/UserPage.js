import React from 'react';
import {apiPrefix, serverPort} from "../etc/config.json"
import cookie from 'react-cookies'
import OrderStore from "./store/OrderStore";

const createReactClass = require('create-react-class');

const UserPage = createReactClass({

    getInitialState() {
        OrderStore.setUpConnection();
        OrderStore.loadProducts(this.props.match.params.id);
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

    logout: function () {
        cookie.remove('user');
        this.props.history.push('/');
    },

    render() {
        console.log(this.state.products);
        if (this.state.products.status) {
            return (
                <div className={"one"}>
                    <button onClick={this.logout}>Выход</button>
                    <div className={"text_button"}>
                        <div id={"description"}>{this.state.products.data.description}</div>
                        <button type="submit" id="byButton" onClick={this.wantToBuy}>Купить</button>
                    </div>
                    <img className={"oneImg"} src={require(`../product/img/${this.state.products.data.image_large_version}`)}
                         alt={"YEE"}/>
                </div>
            );
        } else {
            return (
                <div id='empty'>
                    <button onClick={this.logout}>Выход</button>
                    <span>{this.state.products.data}</span>
                </div>
            )
        }
    }
});


export default UserPage;