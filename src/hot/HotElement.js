import React, {Component} from 'react';

class HotElement extends Component {
    render() {
        const imgUrl = "./img/".concat(this.props.item.img);
        const imgSrc = require(`${imgUrl}`);
        return (
            <a href={"/login/login.html"} className='product'>
                <img className="productImg" src={imgSrc} alt={"YEE"}/>
            </a>
        );
    }
}

export default HotElement;
