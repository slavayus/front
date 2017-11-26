import React from 'react';
import '../css/categories.css'
import CategoriesStore from '../store/CategoriesStore';
import App from '../../App/App';

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
        CategoriesStore.removeChangeListener(this.onChange);
    },

    onChange() {
        this.setState(CategoriesStore.getCategories())
    },

    render() {
        return (
            <ul id="list">
                <li onClick={App.onSelectType}><a type={'Все продукты'}>Все продукты</a></li>
                {this.state.categories.map((item, index) => (
                    <li key={index} onClick={App.onSelectType}><a type={item.type}>{item.type}</a></li>
                ))}
            </ul>
        );
    }
});


export default Categories;