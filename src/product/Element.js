import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";

class Element extends Component {
    render() {
        const imgUrl = "./img/".concat(this.props.item.image_min_version);

        const imgSrc = require(`${imgUrl}`);
        return (
            <Link to={`/products/${this.props.item.id}`} className='product'>
                <img className="productImg" src={imgSrc} alt={"YEE"}/>
                <span className="productText">{this.props.item.name}</span>
                <span className="productPrice">{this.props.item.price}</span>
            </Link>
        );
    }
}

export default Element;
