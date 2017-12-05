import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {MuiThemeProvider} from "material-ui";
import Link from "react-router-dom/es/Link";
import PropTypes from 'prop-types';
import FacebookLogin from "react-facebook-login";
import axios from 'axios'
import {apiPrefix, serverPort, stomp} from "../../etc/config.json"
import * as cookie from "react-cookies";

let currentThis;

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        currentThis = this;
    }

    responseFacebook(response) {
        axios.post(`${apiPrefix}:${serverPort}/login/facebook`, {
            facebookId: response.userID,
            name: response.name,
            password: response.accessToken,
        }, {withCredentials: true})
            .then(function (response) {
                cookie.save('user', response.data.data);
                console.log(currentThis.props);
                currentThis.props.history.goBack();
            }).catch(function (error) {
            console.log(error);
        });
        console.log(response);
    }

    render() {
        const onSubmit = this.props.onSubmit;
        const onChange = this.props.onChange;
        const errors = this.props.errors;
        const user = this.props.user;
        return (

            <div>
                <MuiThemeProvider>
                    <Card className="container">
                        <form action="/" onSubmit={onSubmit}>
                            <h2 className="card-heading">Login</h2>

                            {errors.summary && <p className="error-message">{errors.summary}</p>}

                            <div className="field-line">
                                <TextField
                                    floatingLabelText="Email"
                                    name="email"
                                    errorText={errors.email}
                                    onChange={onChange}
                                    value={user.email}
                                />
                            </div>

                            <div className="field-line">
                                <TextField
                                    floatingLabelText="Password"
                                    type="password"
                                    name="password"
                                    onChange={onChange}
                                    errorText={errors.password}
                                    value={user.password}
                                />
                            </div>

                            <div className="button-line">
                                <RaisedButton type="submit" label="Log in"/>
                            </div>

                            <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
                        </form>
                    </Card>

                </MuiThemeProvider>
                <FacebookLogin
                    appId="2141240026103660"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    cssClass="my-facebook-button-class"
                />
            </div>
        )
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default LoginForm;