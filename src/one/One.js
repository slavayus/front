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
        console.log(this.state.products.status);
        if (this.state.products.status) {

            return (
                <div className='main'>
                    {this.state.products.data.description}
                    <img src={require(`./img/${this.state.products.data.image_large_version}`)} alt={"YEE"}/>
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

export default One;