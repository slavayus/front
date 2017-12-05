import React from 'react';
import SignUpForm from './SignUpForm.js';


import axios from 'axios'
import {apiPrefix, serverPort} from "../../etc/config.json"
import * as cookie from "react-cookies";

let currentThis;

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        currentThis = this;

        this.state = {
            errors: {},
            user: {
                email: '',
                name: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    processForm(event) {
        event.preventDefault();

        axios.post(`${apiPrefix}:${serverPort}/auth/signup`, {
            name: this.state.user.name,
            email: this.state.user.email,
            password: this.state.user.password
        }, {withCredentials: true}).then(function (response) {
            if (response.data.success) {
                cookie.save('user', response.data.data);

                currentThis.setState({
                    errors: {}
                });

                currentThis.props.history.push('/');
            } else {
                const errors = response.data.errors ? response.data.errors : {};
                errors.summary = response.data.message;

                currentThis.setState({
                    errors
                });
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }

}

export default SignUpPage;