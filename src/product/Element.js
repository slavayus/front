import React, {Component} from 'react';

class Element extends Component {

    render() {
        const imgSrc = require(`${this.props.item.img}`);
        return (
            <div className='product'>
                <img className="productImg" src={imgSrc} alt={"YEE"}/>
            </div>


        );
    }
}

export default Element;
