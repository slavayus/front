import React, {PropTypes} from 'react';
import LoginForm from './LoginForm.js';

import axios from 'axios'
import {apiPrefix, serverPort} from "../../etc/config.json"


let currentThis;


class LoginPage extends React.Component {

    /**
     * Class constructor.
     */
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

    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();


        // create a string for an HTTP body message
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);

        axios.post(`${apiPrefix}:${serverPort}/auth/login`, {
            email: email,
            password: password
        }).then(function (response) {
            console.log(response.data);
            if (response.data.success) {
                // success
                // change the component-container state
                currentThis.setState({
                    errors: {}
                });
                console.log('The form is valid');
            } else {
                // failure
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

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }


    /**
     * Render the component.
     */
    render() {
        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }

}

export default LoginPage;