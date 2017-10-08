import React, {Component} from 'react';
import './css/product.css'
import Img from 'react-image'

class Product extends Component {
    render() {
        console.log(this.props.store[0].img);
        return (
            <div className='main'>
                <div className='product'>
                    const myComponent = () => <Img src={this.props.store[0].img}/>
                </div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
                <div className='product'></div>
            </div>
        );
    }
}

export default Product;
