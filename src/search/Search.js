import React from 'react';
import '../product/css/product.css'
import Element from '../product/Element'
import SearchStore from './SearchStore';
import SearchSort from "../sort/SearchSort";

const createReactClass = require('create-react-class');

const Search = createReactClass({
    getInitialState() {
        SearchStore.setUpConnection();
        return SearchStore.getProducts();
    },

    componentDidMount() {
        SearchStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        SearchStore.removeChangeListener();
    },

    onChange() {
        this.setState(SearchStore.getProducts())
    },

    render() {
        if (this.state.products.status) {
            return (
                <div className='main'>
                    <SearchSort/>
                    {this.state.products.data.map((item, index) => (
                        <Element key={index} item={item}/>
                    ))}
                </div>
            );
        } else {
            return (
                <div id='empty'>
                    <span>{this.state.products.data}</span>
                </div>
            )
        }
    }
});

export default Search;