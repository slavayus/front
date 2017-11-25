import React, {Component} from 'react';

class Element extends Component {
    render() {
        const imgUrl = "./img/".concat(this.props.item.image_min_version);

        const imgSrc = require(`${imgUrl}`);
        return (
            <a href={"/login/login.html"} className='product'>
                <img className="productImg" src={imgSrc} alt={"YEE"}/>
                <span className="productText">{this.props.item.name}</span>
            </a>
        );
    }
}

export default Element;
