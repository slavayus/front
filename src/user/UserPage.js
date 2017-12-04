import React from 'react';
import {apiPrefix, serverPort} from "../etc/config.json"
import cookie from 'react-cookies'

const createReactClass = require('create-react-class');

const UserPage = createReactClass({
    componentDidMount() {
        if(!cookie.load('user')){
            this.props.history.push('/login');
        }
    },

    logout: function () {
        cookie.remove('user');
        this.props.history.push('/');
    },

    render() {
        return (
            <div>
                <button onClick={this.logout}>Выход</button>
                <h1>{cookie.load('user')}</h1>
            </div>
        );
    }
});


export default UserPage;