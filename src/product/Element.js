import React, {Component} from 'react';

class Element extends Component {
    render() {
        const imgUrl = "./img/".concat(this.props.item.img);
        const imgSrc = require(`${imgUrl}`);
        return (
            <a href={"/public/login/login.html"} className='product'>
                <img className="productImg" src={imgSrc} alt={"YEE"}/>
                <span className="productText">{this.props.item.description}</span>
            </a>
        );
    }
}

export default Element;
