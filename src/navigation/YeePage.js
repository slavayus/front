import React from 'react';
import axios from 'axios'
import {serverPort} from "../etc/config.json"
import {apiPrefix} from "../etc/config.json";
import cookie from 'react-cookies'

const createReactClass = require('create-react-class');

const YeePage = createReactClass({
    render() {
        axios.get(`${apiPrefix}:${serverPort}/yee`, {
            withCredentials: true,
        }).then(function (response) {
            cookie.save('numberOfVisit', response.data);
            // alert(cookie.load('numberOfVisit'));
            console.log(cookie.loadAll());
        }).catch(function (error) {
            console.log(error);
        });

        return (
            <div>

            </div>
        );
    }
});


export default YeePage;