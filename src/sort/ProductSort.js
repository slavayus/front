import React from 'react';
import './css/sort.css'
import ProductStore from "../product/ProductStore";

const createReactClass = require('create-react-class');

const ProductSort = createReactClass({
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
        ProductStore.getProducts().products.sort(function (firstProduct, secondProduct) {
            return firstProduct.price - secondProduct.price;
        });
        ProductStore.getStore().dispatch({type: 'LOAD', data: ProductStore.getProducts().products});
    },

    sortBelow() {
        ProductStore.getProducts().products.sort(function (firstProduct, secondProduct) {
            return secondProduct.price - firstProduct.price;
        });
        ProductStore.getStore().dispatch({type: 'LOAD', data: ProductStore.getProducts().products});
    }
});

export default ProductSort;