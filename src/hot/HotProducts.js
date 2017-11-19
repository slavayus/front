import React, {Component} from 'react';
import './css/hot.css'
import Element from './HotElement'

class HotProducts extends Component {
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

export default HotProducts;
