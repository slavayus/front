import React from 'react';
import cookie from 'react-cookies'
import "./css/user.css"
import BasketStore from "./store/BasketStore";
import Element from "../product/Element";
import axios from "axios/index";
import {apiPrefix, serverPort} from "../etc/config";
import Modal from 'react-modal';

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

    byAllProducts: function () {
        const basketPrice = this.calculateTotalPrice();
        if (BasketStore.getStore().getState().count.count > basketPrice) {
            this.props.history.push('/checkorder');
        } else {
            return BasketStore.getStore().dispatch({
                type: 'UPDATE_OPEN',
                data: {
                    data: BasketStore.getStore().getState().data,
                    count: BasketStore.getStore().getState().count,
                    open: true
                }
            });
        }

        axios.post(`${apiPrefix}:${serverPort}/order/basket`, {
            productsId: Array.from(cookie.load('basket')),
            productsPrice: basketPrice
        }, {withCredentials: true}).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    },

    calculateTotalPrice: function () {
        let totalPrice = 0;
        BasketStore.getStore().getState().data.forEach(value => totalPrice += value.price);
        return totalPrice;
    },

    closeModal: function () {
        BasketStore.getStore().dispatch({
            type: 'UPDATE_OPEN',
            data: {
                data: BasketStore.getStore().getState().data,
                count: BasketStore.getStore().getState().count,
                open: false
            }
        });
    },


    render() {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                background: '#9E9C9C',
                color: '#dadada'
            }
        };

        return (
            this.state.products.status ?
                <div className='userMain'>
                    <div id={"byAllProducts"}>
                        <span onClick={() => this.byAllProducts()}>Купить все продукты</span>
                        <label> </label>
                        <span>Общая цена: {this.calculateTotalPrice()}</span>
                    </div>
                    {this.state.products.data.map((item, index) => (
                        <Element key={index} item={item}/>
                    ))}

                    <Modal
                        isOpen={BasketStore.getStore().getState().open}
                        style={customStyles}
                        contentLabel="Modal">

                        <h1 id={"modalHeader"}>Не хватает средств на счету</h1>
                        <button type='submit' className='sendButton' id={'modalButton'}
                                onClick={() => this.closeModal()}>Понял. Принял.
                        </button>
                    </Modal>
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