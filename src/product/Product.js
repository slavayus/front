import React, {Component} from 'react';
import './css/product.css'
import Element from './Element'


class Product extends Component {
    render() {
        return (
            <div className='main'>
                {this.props.store.map((item, index) => (
                    <Element key={index} item={item}/>
                ))}
            </div>
        );
    }
}

export default Product;
