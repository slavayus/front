import React from 'react';
import {apiPrefix, serverPort} from "../etc/config.json"
import '../product/css/product.css'
import axios from "axios/index";
import XHRUploader from 'react-xhr-uploader'

const createReactClass = require('create-react-class');

let currentThis;

const Hot = createReactClass({
    getInitialState() {
        return {
            addHot: {message: ''}
        };
    },

    addHot: function () {
        currentThis = this;
        let hotIdProduct = document.getElementById('hotIdProduct');
        let hotPrice = document.getElementById('hotPriceInput');
        if (hotPrice.value !== '' && hotIdProduct.value !== '') {
            axios.post(`${apiPrefix}:${serverPort}/admin/product/addHot`, {
                productId: hotIdProduct.value,
                hotPrice: hotPrice.value
            }, {withCredentials: true}).then(function (response) {
                if (response.data === 'Permission denied') {
                    currentThis.props.history.push('/uups');
                } else {
                    currentThis.setState({addHot: {message: response.data}});
                }
            }).catch(function (error) {
                console.log(error);
                currentThis.setState({addHot: {message: error}});
            });
        } else {
            currentThis.setState({addHot: {message: 'Заполните все поля.'}});
        }
        hotIdProduct.value = '';
        hotPrice.value = '';
    },

    render() {
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
            <button type='submit' className='sendButton'
                    onClick={() => this.addHot()}>Добавить
            </button>
        </div>;

        return (
            <div className={"productAdmin"}>
                {addHot}
            </div>
        );
    }
});


export default Hot;