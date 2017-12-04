import React from 'react';
import SignUpForm from './SignUpForm.js';


import axios from 'axios'
import {apiPrefix, serverPort} from "../../etc/config.json"
import * as cookie from "react-cookies";

let currentThis;

class SignUpPage extends React.Component {
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
                name: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
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
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create an AJAX request
        axios.post(`${apiPrefix}:${serverPort}/auth/signup`, {
            name: this.state.user.name,
            email: this.state.user.email,
            password: this.state.user.password
        }, {withCredentials: true}).then(function (response) {
            if (response.data.success) {
                cookie.save('user', response.data.data);

                // change the component-container state
                currentThis.setState({
                    errors: {}
                });

                currentThis.props.history.push('/');
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
     * Render the component.
     */
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