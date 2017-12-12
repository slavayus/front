import React from 'react';
import "./css/admin.css"
import Link from "react-router-dom/es/Link";
import cookie from "react-cookies";
import Orders from "./Orders";
import Products from "./Products";
import Hot from "./Hot";
import axios from "axios/index";
import {apiPrefix, serverPort} from "../etc/config";

const createReactClass = require('create-react-class');
const AdminPage = createReactClass({
    logout: function () {
        cookie.remove('user');
        this.props.history.push('/');
    },
    componentDidMount() {
        if (!cookie.load('user')) {
            this.props.history.push('/uups');
        }
    },

    render() {
        let currentThis = this;
        axios.get(`${apiPrefix}:${serverPort}/admin/isAdmin`, {withCredentials: true}).then(function (response) {
            if (response.data === 'Permission denied') {
                currentThis.props.history.push('/uups');
            }
        }).catch(function (error) {
            console.log(error);
        });

        const adminButtons =
            <div id={'adminButtonBlock'}>
                <div id={'adminButtonServer'}>
                    <Link to={'/admin/hot'}>
                        <button type='submit' className='adminButton'>Акции</button>
                    </Link>
                    <Link to={'/admin/products'}>
                        <button type='submit' className='adminButton'>Продукты</button>
                    </Link>
                    <Link to={'/admin/orders'}>
                        <button type='submit' className='adminButton'>Покупки</button>
                    </Link>
                </div>
                <button type='submit' className='adminButton' onClick={this.logout}>Выход</button>
            </div>;

        let section;
        switch (this.props.match.params.section) {
            case 'orders':
                section = <Orders history={this.props.history}/>;
                break;
            case 'products':
                section = <Products history={this.props.history}/>;
                break;
            default :
                section = <Hot history={this.props.history}/>
        }


        return (
            <div id={"adminPage"}>
                {adminButtons}
                {section}
            </div>
        );
    }
});


export default AdminPage;