import React from 'react';
import '../css/categories.css'
import CategoriesStore from '../store/CategoriesStore';

const createReactClass = require('create-react-class');

const Categories = createReactClass({
    getInitialState() {
        CategoriesStore.setUpConnection();
        return CategoriesStore.getCategories();
    },

    componentDidMount() {
        CategoriesStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        CategoriesStore.removeChangeListener(this.onChange);
    },

    onChange() {
        this.setState(CategoriesStore.getCategories())
    },

    render() {
        return (
            <div>
                {console.log("-------------------------------------------------")}
                {console.log(this.state.categories[3])}
                <ol>
                    {this.state.categories.map((item, index) => (
                        <li key={index}>{item.type}</li>
                    ))}
                </ol>
            </div>
        );
    }
});


export default Categories;
// this.state.notes
//
//
// module.exports = createReactClass({
//     render: function () {
//         return (
//             <div>
//                 <h1> the list </h1>
//             </div>
//         )
//     }
// });