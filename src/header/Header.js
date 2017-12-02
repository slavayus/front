import React from 'react';
import './css/header.css'
import './css/header_mobile.css'
import Link from "react-router-dom/es/Link";
import Categories from "../categories/script/Categories";
import SearchStore from "../search/SearchStore";

const createReactClass = require('create-react-class');

const Header = createReactClass({
    getInitialState() {
        return {redirect: false};
    },

    render() {
        return (
            <div>
                <div id="button_hidden">
                    <div className="logo_max">
                        <Link to='/'> Mr. Robot</Link>
                    </div>
                    <input type="checkbox" id="nav-toggle" hidden/>
                    <nav className="nav">
                        <label htmlFor="nav-toggle" className="nav-toggle"/>
                        <h2 className="logo">
                            <Link to='/'> Mr. Robot</Link>
                        </h2>
                        <ul>
                            <li><Link to={"/products"}>Продукты</Link></li>
                            <li><a href="#2">Акции</a></li>
                            <li><a href="#3">Сервис</a></li>
                            <li><a href="#4">Войти</a></li>
                            <li><input className='inputText' type="text" placeholder="Искать здесь..."
                                       onKeyPress={this.searchClickMobile}/></li>
                        </ul>
                    </nav>
                </div>

                <div id="header">
                    <div className="logo_max">
                        <Link to='/'> Mr. Robot</Link>
                    </div>
                    <div id="elements">
                        <div className="action">Продукты
                            <Categories/>
                        </div>
                        <div className="action">Акции</div>
                        <div className="action">Сервис</div>
                    </div>
                    <div id="left">
                        <div id="enter" className="action">Войти</div>
                        <input type="text" placeholder="Искать здесь..." className='inputText'
                               onKeyPress={this.searchClickFull}/>
                        <button type="submit" className="searchButton" onClick={this.searchClickButton}/>
                        <Link to={'/search'}>
                            <button type='submit' id='link_hidden'/>
                        </Link>
                    </div>
                </div>
            </div>);
    },

    searchClickMobile(event) {
        if (event.key === 'Enter') {
            let mobileInputText = document.getElementsByClassName('inputText')[0];
            if (mobileInputText.value !== '') {
                this.getProducts(mobileInputText.value);
            }
            mobileInputText.value = '';
        }
    },

    searchClickFull(event) {
        if (event.key === 'Enter') {
            let fullInputText = document.getElementsByClassName('inputText')[1];
            if (fullInputText.value !== '') {
                this.getProducts(fullInputText.value);
            }
            fullInputText.value = '';
        }
    },

    searchClickButton() {
        let fullInputText = document.getElementsByClassName('inputText')[1];
        if (fullInputText.value !== '') {
            this.getProducts(fullInputText.value);
        }
        fullInputText.value = '';
    },

    getProducts(value) {
        SearchStore.loadProducts(value);
        document.getElementById('link_hidden').click();
    }
});

export default Header;
