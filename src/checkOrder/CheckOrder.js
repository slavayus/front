import React from 'react';
import cookie from 'react-cookies'
import '../product/css/product.css'
import {apiPrefix, serverPort} from "../etc/config";
import axios from "axios/index";
import "./css/CheckOrder.css";

const createReactClass = require('create-react-class');

let code;
let currentThis;

const CheckOrder = createReactClass({

    getInitialState() {
        code = '';
        return {
            codeStatus: "check"
        };
    },

    componentDidMount() {
        if (!cookie.load('user')) {
            this.props.history.push('/login');
        }
    },

    checkThisCode: function () {
        currentThis = this;
        let orderCode = document.getElementById('orderCode');
        if (orderCode.value !== '') {
            axios.get(`${apiPrefix}:${serverPort}/checkorder?code=${orderCode.value}`, {withCredentials: true}).then(function (response) {
                if (response.data === "codeIsOk") {
                    currentThis.props.history.push('/ordered');
                } else {
                    currentThis.setState({codeStatus: response.data});
                }
            }).catch(function (error) {
                currentThis.setState({codeStatus: "codeIsFalse"});
            });
            orderCode.value = '';
            return;
        }
        code = "Введите что-нибудь.";
        this.setState({codeStatus: "codeIsFalse"});
    },

    render() {
        switch (this.state.codeStatus) {
            case "codeIsFalse":
                code = "Что-то не так с вашим кодом.";
                break;
            default:
                break;
        }

        return (
            <div id={"checkOrder"}>
                <div>На вашу почту было отправлено сообщение с кодом подтверждения покупки. Введите в поле ниже этот
                    код.
                </div>
                <input id={"orderCode"} className='inputText' type="text" placeholder="код"/><br/>
                <button type='submit' className='sendButton'
                        onClick={() => this.checkThisCode()}>Проверить
                </button>
                <br/>
                {code}
            </div>
        );
    }
});


export default CheckOrder;