import React from 'react';
import cookie from 'react-cookies'
import "./css/user.css"
import Orders from './Orders'
import Basket from "./Basket";
import Link from "react-router-dom/es/Link";
import {apiPrefix, serverPort} from "../etc/config";
import axios from "axios/index";

const createReactClass = require('create-react-class');


const UserPage = createReactClass({
    logout: function () {
        cookie.remove('user');
        this.props.history.push('/');
    },

    getInitialState() {
        return {admin: false}
    },

    componentDidMount() {
        let currentThis = this;
        axios.get(`${apiPrefix}:${serverPort}/admin/isAdmin`, {withCredentials: true}).then(function (response) {
            if (response.data !== 'Permission denied') {
                currentThis.setState({admin: true});
            }
        }).catch(function (error) {
            console.log(error);
        });
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
                {this.state.admin === true ? <Link to={'/admin/orders'}>
                    <button type='submit' className='userButton'>Admin</button>
                </Link> : <div> </div>}
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