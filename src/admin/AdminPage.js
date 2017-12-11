import React from 'react';
import "./css/admin.css"
import Link from "react-router-dom/es/Link";
import cookie from "react-cookies";
import Orders from "./Orders";

const createReactClass = require('create-react-class');

const AdminPage = createReactClass({
    logout: function () {
        cookie.remove('user');
        this.props.history.push('/');
    },


    render() {

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

        return (
            <div id={"adminPage"}>
                {adminButtons}

                {this.props.match.params.section === 'orders' ? <Orders/> : "YEE"}
            </div>
        );
    }
});


export default AdminPage;