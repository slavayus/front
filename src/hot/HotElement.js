import React, {Component} from 'react';

class HotElement extends Component {
    render() {
        if (this.props.id % 2) {
            return (
                <div id={'hotElements'}>
                    <div id={"text"}>
                        <div><span id="hotName">{this.props.item.product.name}</span></div>
                        <div><span id="oldPrice">{this.props.item.old_price}</span></div>
                        <div><span id="hotPrice">{this.props.item.product.price}</span></div>
                    </div>
                    <img className={"hotImg"} src={require(`./img/${this.props.item.image_hot_version}`)} alt={"YEE"}/>
                </div>
            )
        } else {
            return (
                <div id={'hotElements'}>
                    <img className={"hotImg"} src={require(`./img/${this.props.item.image_hot_version}`)} alt={"YEE"}/>
                    <div id={"text"}>
                        <div><span id="hotName">{this.props.item.product.name}</span></div>
                        <div><span id="oldPrice">{this.props.item.old_price}</span></div>
                        <div><span id="hotPrice">{this.props.item.product.price}</span></div>
                    </div>
                </div>
            );
        }
    }
}

export default HotElement;
