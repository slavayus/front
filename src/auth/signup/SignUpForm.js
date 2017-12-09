import React from 'react';
import {Card} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Link from "react-router-dom/es/Link";
import PropTypes from 'prop-types';
import {MuiThemeProvider} from "material-ui";
import '../css/auth.css'

const SignUpForm = ({
                        onSubmit,
                        onChange,
                        errors,
                        user,
                    }) => (
    <MuiThemeProvider
        style={{'backgroundColor': '#9E9C9C', 'borderColor': 'none', 'borderStyle': 'none', 'boxShadow': 'none'}}>
        <Card className="container" containerStyle={{
            'backgroundColor': '#9E9C9C',
            'borderColor': 'none',
            'borderStyle': 'none',
            'boxShadow': 'none'
        }}>
            <form action="/" onSubmit={onSubmit}>
                <h2 className="card-heading">Регистрация</h2>

                {errors.summary && <p className="error-message">{errors.summary}</p>}

                <div className="field-line">
                    <TextField
                        floatingLabelText="Name"
                        name="name"
                        errorText={errors.name}
                        onChange={onChange}
                        value={user.name}
                    />
                </div>

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


                <button className="button-line" type="submit">Зарегистрироваться</button>

                <p id={"message-register"}>Уже есть аккаунт? <Link to={'/login'}>Войти</Link>.</p>
            </form>
        </Card>
    </MuiThemeProvider>
);

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default SignUpForm;