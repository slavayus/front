import React from 'react';
import '../css/categories.css'
import CategoriesStore from '../store/CategoriesStore';

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
            <div>
                <ul id="list">
                    {this.state.categories.map((item, index) => (
                        <li key={index}><a>{item.type}</a></li>
                    ))}
                </ul>
            </div>
        );
    }
});


export default Categories;