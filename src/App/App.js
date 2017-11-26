import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from "../product/Product";
import ProductStore from "../product/ProductStore";
import Header from "../header/Header";

let typeProduct = 'Все продукты';

class App extends Component {
    static onSelectType(action) {
        typeProduct = action.target.getAttribute('type');
        ProductStore.loadProducts(typeProduct);
    }

    render() {
        return (
            <div>
                <Header/>
                {/*<HotProducts store={this.props.hotElements}/>*/}
                <Product type={typeProduct}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        hotElements: state
    }),
    dispatch => ({})
)(App);
