import React, {Component} from 'react';
import Header from "../header/Header";
import {Route, Switch} from "react-router-dom";
import ProductNavigation from "./ProductNavigation";
import Search from "../search/Search";
import Hot from "../hot/Hot";
import CategoriesMobile from "../categories/script/CategoriesMobile";
import LoginPage from "../auth/login/LoginPage";
import SignUpPage from "../auth/signup/SignUpPage";
import AdminPage from "../admin/AdminPage";
import UserPage from "../user/UserPage";
import Snapshot from "../product_snapshot/Snapshot";
import NotFound from "../pageNotFound/NotFound";
import CheckOrder from "../checkOrder/CheckOrder";
import Ordered from "../ordered/Ordered";

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
                    <Route path='/login/' component={LoginPage}/>
                    <Route path='/signup' component={SignUpPage}/>
                    <Route path='/user/:section' component={UserPage} />
                    <Route path='/admin/:section' component={AdminPage}/>
                    <Route path='/snapshot/:id' component={Snapshot}/>
                    <Route path='/checkorder' component={CheckOrder}/>
                    <Route path='/ordered' component={Ordered}/>
                    <Route path='*' component={NotFound}/>
                </Switch>
            </div>
        )
    }
}

export default Navigation;