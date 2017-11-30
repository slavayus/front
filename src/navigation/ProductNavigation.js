import React, {Component} from 'react';
import App from "../App/App";
import {Route, Switch} from "react-router-dom";
import One from "../one/One";

class Navigation extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/products' component={App}/>
                    <Route path='/products/:id' component={One}/>
                </Switch>
            </div>
        )
    }
}

export default Navigation;