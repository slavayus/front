import React, {Component} from 'react';
import Header from "../header/Header";
import {Route, Switch} from "react-router-dom";
import ProductNavigation from "./ProductNavigation";
import Search from "../search/Search";
import Hot from "../hot/Hot";
import CategoriesMobile from "../categories/script/CategoriesMobile";

class Navigation extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={Hot}/>
                    <Route path='/products' component={ProductNavigation}/>
                    <Route path='/products-categories' component={CategoriesMobile}/>
                    <Route path='/search' component={Search}/>
                </Switch>
            </div>
        )
    }
}

export default Navigation;