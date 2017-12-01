import React from 'react';
import './css/sort.css'
import SearchStore from "../search/SearchStore";

const createReactClass = require('create-react-class');

const SearchSort = createReactClass({
    render() {
        return (
            <div className='mainSort'>
                <div>Сортировать:</div>
                <div className='sortByPrice'>
                    <div className='sortTypeText'>по цене:</div>
                    <div>
                        <button type='submit' className='sortButton' onClick={this.sortAbove}>выше</button>
                        <button type='submit' className='sortButton' onClick={this.sortBelow}>ниже</button>
                    </div>
                </div>
            </div>
        )
    },

    sortAbove() {
        SearchStore.getProducts().products.data.sort(function (firstProduct, secondProduct) {
            return firstProduct.price - secondProduct.price;
        });
        SearchStore.getStore().dispatch({type: 'LOAD', data: SearchStore.getProducts().products.data});
    },

    sortBelow() {
        SearchStore.getProducts().products.data.sort(function (firstProduct, secondProduct) {
            return secondProduct.price - firstProduct.price;
        });
        SearchStore.getStore().dispatch({type: 'LOAD', data: SearchStore.getProducts().products.data});
    }
});

export default SearchSort;