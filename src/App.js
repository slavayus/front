import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from "./product/Product";

class App extends Component {
    render() {
        return (
            <Product store={this.props.testList}/>
        );
    }
}

export default connect(
    state => ({
        testList: state
    }),
    dispatch => ({})
)(App);
