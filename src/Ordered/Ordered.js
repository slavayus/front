import React from 'react';
import "./ordered.css"
import {apiPrefix, serverPort} from "../etc/config";

const createReactClass = require('create-react-class');

const Ordered = createReactClass({
    redirectToHome: function () {
        this.props.history.push('/');
    },

    render() {
        return (
            <div id={"checkOrder"}>
                <span>Товар успешно заказан. </span>
                <button type='submit' className='sendButton' id={"orderedSendButton"}
                        onClick={() => this.redirectToHome()}>Продолжить покупку товаров.
                </button>
            </div>
        );
    }
});


export default Ordered;