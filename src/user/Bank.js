import React from 'react';
import cookie from 'react-cookies'
import "./css/user.css"
import axios from "axios/index";
import {apiPrefix, serverPort} from "../etc/config";

const createReactClass = require('create-react-class');

let currentThis;

const Bank = createReactClass({
    getInitialState() {
        currentThis = this;
        axios.get(`${apiPrefix}:${serverPort}/user/bank/count?`, {withCredentials: true}).then(function (response) {
            currentThis.setState({count: response.data})
        }).catch(function (error) {
            console.log(error);
        });
        return {
            count: 0,
            message: ''
        }
    },

    componentDidMount() {
        if (!cookie.load('user')) {
            this.props.history.push('/login');
        }
    },

    byAllProducts: function () {
        axios.post(`${apiPrefix}:${serverPort}/order/basket?`, {
            productsId: Array.from(cookie.load('basket'))
        }, {withCredentials: true}).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    },

    deposit: function () {
        currentThis = this;
        let cardNumber = document.getElementById('cardNumber');
        let inputSum = document.getElementById('inputSum');
        let monthYear = document.getElementById('monthYear');
        let nameSurname = document.getElementById('nameSurname');
        let cvv = document.getElementById('cvv');
        if (cardNumber.value !== '' && inputSum.value !== '' && monthYear !== '' && nameSurname !== '' && cvv !== '') {

            let month = monthYear.value[0] + monthYear.value[1];
            let monthNumber = Number(month);

            if (!isNaN(monthNumber)) {
                if (monthNumber <= 0 || monthNumber > 12) {
                    return this.setState({message: 'Такого месяца нет.'})
                }
            } else {
                return this.setState({message: 'Месяц должен быть числом.'})
            }

            let year = monthYear.value[3] + monthYear.value[4];
            let yearNumber = Number(year);


            if (!isNaN(yearNumber)) {
                if (yearNumber <= 0 || yearNumber > 99) {
                    return this.setState({message: 'Проверьте год.'})
                }
            } else {
                return this.setState({message: 'Год должен быть числом.'})
            }

            let carNumberValue = Number(cardNumber.value);
            if (!isNaN(carNumberValue)) {
                if ((carNumberValue + '').length !== 16) {
                    return this.setState({message: 'Длина номера карты должна быть равна 16 символам.'});
                }
            } else {
                return this.setState({message: 'Номер карты должен быть числом.'});
            }

            let inputSumValue = Number(inputSum.value);
            if (!isNaN(inputSumValue)) {
                if (inputSumValue > 500000) {
                    return this.setState({message: 'За раз можно пополнить не более чем на 500000.'});
                }
            } else {
                return this.setState({message: 'Сумма должена быть числом.'});
            }

            let cvvValue = Number(cvv.value);
            if (!isNaN(cvvValue)) {
                if ((cvvValue + '').length !== 3) {
                    return this.setState({message: 'Cvv должен состоять из 3 цифр.'});
                }
            } else {
                return this.setState({message: 'Cvv должен быть числом.'});
            }

            this.setState({message: 'Операция выполняется.'});

            axios.get(`${apiPrefix}:${serverPort}/user/bank/count/add?sum=${inputSum.value}`, {withCredentials: true}).then(function (response) {
                if (response.data.status) {
                    currentThis.setState({count: response.data.count, message: "Операция прошла успешно."});
                } else {
                    currentThis.setState({message: 'Не удалось завершить операцию.'});
                }
            }).catch(function (error) {
                currentThis.setState({addHot: {message: error}});
            });
        } else {
            currentThis.setState({message: 'Не удалось завершить операцию.'});
        }
    },

    render() {
        return (
            <div id={'bank'}>
                <div id={'bankFirstDiv'}>
                    У вас на счету: {this.state.count}
                </div>
                <div id={'bankSecondDiv'}>
                    <div>Пополнить счет</div>
                    <input id={"cardNumber"} className='inputText' type="text" placeholder="Номер карты"/>
                    <input id={"inputSum"} className='inputText' type="text" placeholder="Сумма"/>
                    <input id={"monthYear"} className='inputText' type="text" placeholder="Месяц/Год"/>
                    <input id={"nameSurname"} className='inputText' type="text" placeholder="Имя фамилия"/>
                    <input id={"cvv"} className='inputText' type="text" placeholder="cvv"/>

                    <div>{this.state.message}</div>
                    <button type='submit' className='sendButton'
                            onClick={() => this.deposit()}>Пополнить
                    </button>
                </div>
            </div>
        );
    }
});


export default Bank;