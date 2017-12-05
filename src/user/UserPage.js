import React from 'react';
import {apiPrefix, serverPort} from "../etc/config.json"
import cookie from 'react-cookies'
import OrderStore from "./store/OrderStore";
import Element from "../product/Element";

const createReactClass = require('create-react-class');

const UserPage = createReactClass({

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

    logout: function () {
        cookie.remove('user');
        this.props.history.push('/');
    },

    render() {
        if (this.state.products.status) {
            return (
                <div className={"one"}>
                    <button onClick={this.logout}>Выход</button>
                    {/*<div className={"text_button"}>*/}
                    {/*<div id={"description"}>{this.state.products.data.description}</div>*/}
                    {/*<button type="submit" id="byButton" onClick={this.wantToBuy}>Купить</button>*/}
                    {/*</div>*/}
                    <div className='main'>
                        <ul>
                            {/*{console.log(this.state.products.data.products_snapshot)}*/}
                            {this.state.products.data.map((item, index) => (
                                <li key={'index'}>{item.products_snapshot.name}</li>
                            ))}
                        </ul>
                    </div>

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