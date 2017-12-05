import React from 'react';
import LoginForm from './LoginForm.js';
import sha1 from 'sha1'

import axios from 'axios'
import {apiPrefix, serverPort} from "../../etc/config.json"
import * as cookie from "react-cookies";


let currentThis;


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        currentThis = this;

        // set the initial component state
        this.state = {
            errors: {},
            user: {
                email: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        event.preventDefault();

        axios.post(`${apiPrefix}:${serverPort}/auth/login/salt`, {
            email: this.state.user.email
        }, {withCredentials: true}).then(function (response) {
                const salt = response.data.data;

                const protectedPassword = sha1(sha1(currentThis.state.user.password) + salt);

                axios.post(`${apiPrefix}:${serverPort}/auth/login`, {
                    email: currentThis.state.user.email,
                    password: protectedPassword
                }, {withCredentials: true}).then(function (response) {
                    if (response.data.success) {
                        cookie.save('user', response.data.data);
                        currentThis.setState({
                            errors: {}
                        });

                        currentThis.props.history.goBack();
                    } else {
                        const errors = response.data.errors ? response.data.errors : {};
                        errors.summary = response.data.message;

                        currentThis.setState({
                            errors
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
        )
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    render() {
        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
                history={this.props.history}
            />
        );
    }

}

export default LoginPage;