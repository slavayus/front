import React, {Component} from 'react';
import Header from "../header/Header";
import App from "../App/App";
import {Route, Switch} from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Header}/>
                    <Route path='/products' component={App}/>
                </Switch>
            </div>
        )
    }
}

export default Navigation;