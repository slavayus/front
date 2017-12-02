import React from 'react';
import '../css/categories.css'
import CategoriesStore from '../store/CategoriesStore';
import App from '../../App/App';
import Link from "react-router-dom/es/Link";

const createReactClass = require('create-react-class');

const Categories = createReactClass({
    getInitialState() {
        CategoriesStore.setUpConnection();
        return CategoriesStore.getCategories();
    },

    componentDidMount() {
        CategoriesStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        CategoriesStore.removeChangeListener();
    },

    onChange() {
        this.setState(CategoriesStore.getCategories())
    },

    render() {
        return (
            <ul id={"categories_list"}>
                <li onClick={App.onSelectType}><Link to='/products' type={'Все продукты'} >Все продукты</Link></li>
                {this.state.categories.map((item, index) => (
                    <li key={index} onClick={App.onSelectType}><Link to='/products'
                                                                     type={item.type}>{item.type}</Link>
                    </li>
                ))}
            </ul>
        );
    }
});


export default Categories;