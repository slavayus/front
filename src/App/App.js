import React, {Component} from 'react';
import Product from "../product/Product";
import ProductStore from "../product/ProductStore";
import Header from "../header/Header";
import Categories from "../categories/script/Categories";

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

export default App;
