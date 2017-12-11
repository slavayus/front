import React from 'react';
import {apiPrefix, serverPort} from "../etc/config.json"
import '../product/css/product.css'
import axios from "axios/index";
import XHRUploader from 'react-xhr-uploader'

const createReactClass = require('create-react-class');

let currentThis;

const Products = createReactClass({
    getInitialState() {
        return {delete: {message: ''}, addHot: {message: ''}};
    },

    deleteProduct: function () {
        currentThis = this;
        let idProduct = document.getElementById('deleteInput');
        if (idProduct.value !== '') {
            axios.delete(`${apiPrefix}:${serverPort}/admin/product/delete?productId=${idProduct.value}`)
                .then(function (response) {
                    currentThis.setState({delete: {message: response.data}});
                })
                .catch(function (error) {
                    currentThis.setState({delete: {message: error}});
                });
        }
        idProduct.value = '';
    },

    addHot: function () {
        currentThis = this;
        let hotIdProduct = document.getElementById('hotIdProduct');
        let hotPrice = document.getElementById('hotPriceInput');
        if (hotPrice.value !== '' && hotIdProduct.value !== '') {
            axios.post(`${apiPrefix}:${serverPort}/admin/product/addHot`, {
                productId: hotIdProduct.value,
                hotPrice: hotPrice.value
            }).then(function (response) {
                currentThis.setState({addHot: {message: response.data}});
            }).catch(function (error) {
                console.log(error);
                currentThis.setState({addHot: {message: error}});
            });
        }
        hotIdProduct.value = '';
        hotPrice.value = '';
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

        let addHot = <div className={"productElement"}>
            <div>Добавить акцию</div>
            <input id={"hotIdProduct"} className='inputText' type="text" placeholder="id продукта"/>
            <input id={"hotPriceInput"} className='inputText' type="text" placeholder="Новая цена"/>


            <XHRUploader
                url={`${apiPrefix}:${serverPort}/admin/upload`}
                auto
                maxFiles={1}
                styles={myStyles}
                dropzoneLabel={'Выбрать файл'}
                uploadIconClass={'none'}
            />

            <div>{this.state.addHot.message}</div>
            <button type='submit' id={"adminHotAdd"} className='sendButton'
                    onClick={() => this.addHot()}>Добавить
            </button>
        </div>;

        return (
            <div className={"productAdmin"}>
                {deleteProduct}
                {addHot}
                {deleteProduct}
            </div>
        );
    }
});


export default Products;