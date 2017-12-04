import React from 'react';
import "./css/admin.css"

const createReactClass = require('create-react-class');

const AdminPage = createReactClass({
    addProduct: function () {
        console.log("YEE");
    },

    updateProduct: function () {
        console.log("Yee");
    },

    checkAdmin(nextState, replace) {
        console.log("yee");
        // const login = true;
        // if (login) {
            replace('/')
        // }
    },
    render() {
        return (
            <div className={"buttonList"}>
                <div onClick={this.addProduct}> Добавить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
                <div onClick={this.updateProduct}> Изменить товар</div>
            </div>
        );
    }
});


export default AdminPage;