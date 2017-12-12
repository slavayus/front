import React from 'react';
import {apiPrefix, serverPort} from "../etc/config.json"
import '../product/css/product.css'
import axios from "axios/index";
import XHRUploader from 'react-xhr-uploader'

const createReactClass = require('create-react-class');

let currentThis;

const Products = createReactClass({
    getInitialState() {
        return {
            delete: {message: ''},
            updatePrice: {message: ''},
            updateName: {message: ''},
            updateDescription: {message: ''},
            addProduct: {message: ''}
        };
    },

    deleteProduct: function () {
        currentThis = this;
        let idProduct = document.getElementById('deleteInput');
        if (idProduct.value !== '') {
            axios.delete(`${apiPrefix}:${serverPort}/admin/product/delete?productId=${idProduct.value}`, {withCredentials: true})
                .then(function (response) {
                        currentThis.setState({delete: {message: response.data}});
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
                    currentThis.setState({updatePrice: {message: response.data}});
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
                    currentThis.setState({updateName: {message: response.data}});
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
                    currentThis.setState({updateDescription: {message: response.data}});
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


    addProduct: function () {
        currentThis = this;
        let productAddName = document.getElementById('productAddName');
        let productAddDescription = document.getElementById('productAddDescription');
        let productAddPrice = document.getElementById('productAddPrice');
        let productAddType = document.getElementById('productAddType');
        if (productAddName.value !== '' && productAddDescription.value !== '' && productAddType.value !== '' && productAddPrice.value !== '') {
            axios.post(`${apiPrefix}:${serverPort}/admin/product/new`, {
                name: productAddName.value,
                description: productAddDescription.value,
                type: productAddType.value,
                price: productAddPrice.value
            }, {withCredentials: true}).then(function (response) {
                    currentThis.setState({addProduct: {message: response.data}});
            }).catch(function (error) {
                console.log(error);
                currentThis.setState({addProduct: {message: error}});
            });
        } else {
            currentThis.setState({addProduct: {message: 'Заполните все поля.'}});
        }
        productAddName.value = '';
        productAddDescription.value = '';
        productAddPrice.value = '';
        productAddType.value = '';
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

        const myStyles = {
            root: {
                border: 'none',
                padding: 0,
                height: 20

            },
            placeHolderStyle: {
                textAlign: 'left'
            },
            dropTargetStyle: {
                border: 'none',
                padding: 0,
                cursor: 'pointer',
            },
            progress: {
                height: 0
            },
            fileName: {
                display: 'none'
            },
            fileSize: {
                display: 'none'
            },
            removeButton: {
                display: 'none'
            }
        };

        let addProduct = <div className={"productElement"}>
            <div>Добавить акцию</div>
            <input id={"productAddName"} className='inputText' type="text" placeholder="Название продукта"/>
            <input id={"productAddDescription"} className='inputText' type="text" placeholder="Описание продукта"/>
            <input id={"productAddPrice"} className='inputText' type="text" placeholder="Цена продукта"/>
            <input id={"productAddType"} className='inputText' type="text" placeholder="Тип продукта"/>

            <XHRUploader
                url={`${apiPrefix}:${serverPort}/admin/product/image/min`}
                auto
                maxFiles={1}
                styles={myStyles}
                dropzoneLabel={'Маленькая версия фотографии'}
                uploadIconClass={'none'}
            />

            <XHRUploader
                url={`${apiPrefix}:${serverPort}/admin/product/image/max`}
                auto
                maxFiles={1}
                styles={myStyles}
                dropzoneLabel={'Большая версия фотографии'}
                uploadIconClass={'none'}
            />

            <div>{this.state.addProduct.message}</div>
            <button type='submit' className='sendButton'
                    onClick={() => this.addProduct()}>Добавить
            </button>
        </div>;


        return (
            <div className={"productAdmin"}>
                {addProduct}
                {updateProductPrice}
                {updateProductName}
                {updateProductDescription}
                {deleteProduct}
            </div>
        );
    }
});


export default Products;