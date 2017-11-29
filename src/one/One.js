import React from 'react';
import OneStore from "./OneStore";

const createReactClass = require('create-react-class');

const One = createReactClass({
    getInitialState() {
        OneStore.setUpConnection();
        OneStore.loadProducts(this.props.match.params.id);
        return OneStore.getProducts();
    },

    componentDidMount() {
        OneStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        OneStore.removeChangeListener();
    },

    onChange() {
        this.setState(OneStore.getProducts())
    },

    render() {
        console.log(this.state.products.length);
        if (this.state.products.length !== 0) {
            return (
                <div className='main'>
                    {this.state.products.description}
                </div>
            );
        } else {
            return (
                <div id='empty'>
                    <span>{OneStore.getMessage()}</span>
                </div>
            )
        }
    }
});

export default One;