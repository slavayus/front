import React from 'react';
import {apiPrefix, serverPort} from "../etc/config.json"
import '../product/css/product.css'
import axios from "axios/index";

const createReactClass = require('create-react-class');

let currentThis;

const Products = createReactClass({
    getInitialState() {
        return {
            delete: {message: ''},
            updatePrice: {message: ''},
            updateName: {message: ''},
            updateDescription: {message: ''}
        };
    },

    deleteProduct: function () {
        currentThis = this;
        let idProduct = document.getElementById('deleteInput');
        if (idProduct.value !== '') {
            axios.delete(`${apiPrefix}:${serverPort}/admin/product/delete?productId=${idProduct.value}`, {withCredentials: true})
                .then(function (response) {
                    if (response.data === 'Permission denied') {
                        currentThis.props.history.push('/uups');
                    } else {
                        currentThis.setState({delete: {message: response.data}});
                    }
                })
                .catch(function (error) {
                    currentThis.setState({delete: {message: error}});
                });
        } else {
            currentThis.setState({delete: {message: 'Заполните все поля.'}});
        }
        idProduct.value = '';
    },

    updateProductPrice: function () {
        currentThis = this;
        let updateProductPriceId = document.getElementById('updateProductPriceId');
        let updateProductPrice = document.getElementById('updateProductPrice');
        if (updateProductPriceId.value !== '' && updateProductPrice.value !== '') {
            axios.post(`${apiPrefix}:${serverPort}/admin/product/update/price`, {
                productId: updateProductPriceId.value,
                newPrice: updateProductPrice.value
            }, {withCredentials: true}).then(function (response) {
                if (response.data === 'Permission denied') {
                    currentThis.props.history.push('/uups');
                } else {
                    currentThis.setState({updatePrice: {message: response.data}});
                }
            }).catch(function (error) {
                currentThis.setState({updatePrice: {message: error}});
            });
        } else {
            currentThis.setState({updatePrice: {message: 'Заполните все поля.'}});
        }
        updateProductPriceId.value = '';
        updateProductPrice.value = '';
    },

    updateProductName: function () {
        currentThis = this;
        let updateProductNameId = document.getElementById('updateProductNameId');
        let updateProductName = document.getElementById('updateProductName');
        if (updateProductNameId.value !== '' && updateProductName.value !== '') {
            axios.post(`${apiPrefix}:${serverPort}/admin/product/update/name`, {
                productId: updateProductNameId.value,
                newName: updateProductName.value
            }, {withCredentials: true}).then(function (response) {
                if (response.data === 'Permission denied') {
                    currentThis.props.history.push('/uups');
                } else {
                    currentThis.setState({updateName: {message: response.data}});
                }
            }).catch(function (error) {
                currentThis.setState({updateName: {message: error}});
            });
        } else {
            currentThis.setState({updateName: {message: 'Заполните все поля.'}});
        }
        updateProductNameId.value = '';
        updateProductName.value = '';
    },

    updateProductDescription: function () {
        currentThis = this;
        let updateProductDescriptionId = document.getElementById('updateProductDescriptionId');
        let updateProductDescription = document.getElementById('updateProductDescription');
        if (updateProductDescriptionId.value !== '' && updateProductDescription.value !== '') {
            axios.post(`${apiPrefix}:${serverPort}/admin/product/update/description`, {
                productId: updateProductDescriptionId.value,
                newDescription: updateProductDescription.value
            }, {withCredentials: true}).then(function (response) {
                if (response.data === 'Permission denied') {
                    currentThis.props.history.push('/uups');
                } else {
                    currentThis.setState({updateDescription: {message: response.data}});
                }
            }).catch(function (error) {
                console.log(error);
                currentThis.setState({updateDescription: {message: error}});
            });
        } else {
            currentThis.setState({updateDescription: {message: 'Заполните все поля.'}});
        }
        updateProductDescriptionId.value = '';
        updateProductDescription.value = '';
    },

    render() {

        let deleteProduct = <div className={"productElement"}>
            <div>Удалить продукт</div>
            <input id={"deleteInput"} className='inputText' type="text" placeholder="id продукта"/>
            <div>{this.state.delete.message}</div>
            <button type='submit' className='sendButton'
                    onClick={() => this.deleteProduct()}>Удалить
            </button>
        </div>;

        let updateProductPrice = <div className={"productElement"}>
            <div>Обновить цену продукта</div>
            <input id={"updateProductPriceId"} className='inputText' type="text" placeholder="id продукта"/>
            <input id={"updateProductPrice"} className='inputText' type="text" placeholder="Новая цена"/>
            <div>{this.state.updatePrice.message}</div>
            <button type='submit' className='sendButton'
                    onClick={() => this.updateProductPrice()}>Обновить
            </button>

        </div>;

        let updateProductName = <div className={"productElement"}>
            <div>Изменить название продукта</div>
            <input id={"updateProductNameId"} className='inputText' type="text" placeholder="id продукта"/>
            <input id={"updateProductName"} className='inputText' type="text" placeholder="Новое название"/>
            <div>{this.state.updateName.message}</div>
            <button type='submit' className='sendButton'
                    onClick={() => this.updateProductName()}>Обновить
            </button>
        </div>;

        let updateProductDescription = <div className={"productElement"}>
            <div>Изменить описание продукта</div>
            <input id={"updateProductDescriptionId"} className='inputText' type="text" placeholder="id продукта"/>
            <input id={"updateProductDescription"} className='inputText' type="text" placeholder="Новое описание"/>
            <div>{this.state.updateDescription.message}</div>
            <button type='submit' className='sendButton'
                    onClick={() => this.updateProductDescription()}>Обновить
            </button>
        </div>;

        return (
            <div className={"productAdmin"}>
                {deleteProduct}
                {updateProductPrice}
                {updateProductName}
                {updateProductDescription}
            </div>
        );
    }
});


export default Products;