import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from "../product/Product";
import HotProducts from "../hot/HotProducts";
import Categories from "../categories/script/Categories"

class App extends Component {
    render() {
        return (
            <div>

                <Categories />
                {/*<HotProducts store={this.props.hotElements}/>*/}
                <Product store={this.props.hotElements}/>
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
