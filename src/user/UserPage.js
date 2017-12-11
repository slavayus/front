import React from 'react';
import {apiPrefix, serverPort} from "../etc/config.json"
import cookie from 'react-cookies'
import "./css/user.css"
import Orders from './Orders'
import Basket from "./Basket";
import Link from "react-router-dom/es/Link";

const createReactClass = require('create-react-class');


const UserPage = createReactClass({
    logout: function () {
        cookie.remove('user');
        this.props.history.push('/');
    },

    getInitialState: function () {
        return {flag: 'order'};
    },

    render() {

        const userButtons =
            <div id={'userButtonBlock'}>
                <div id={'userButtonServer'}>
                    <Link to={'/user/orders'}>
                        <button type='submit' className='userButton'>Мои покупки</button>
                    </Link>
                    <Link to={'/user/basket'}>
                        <button type='submit' className='userButton'>Корзина</button>
                    </Link>
                </div>
                <button type='submit' className='userButton' onClick={this.logout}>Выход</button>
            </div>;

        return (
            <div>
                <div className={"oneUser"}>
                    {userButtons}
                    {this.props.match.params.section === 'orders' ? <Orders/> : <Basket/>}
                </div>
            </div>
        )
    }
});


export default UserPage;