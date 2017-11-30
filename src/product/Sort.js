import React from 'react';
import './css/sort.css'

const createReactClass = require('create-react-class');

const Sort = createReactClass({
    render() {
        return (
            <div className='mainSort'>
                <div>Сортировать:</div>
                <div className='sortByPrice'>
                    <div className='sortTypeText'>по цене:</div>
                    <div>
                        <button type='submit' className='sortButton' onClick={this.sortAbove}>выше</button>
                        <button type='submit' className='sortButton' onClick={this.sortBelow}>ниже</button>
                    </div>
                </div>
            </div>
        )
    }
});

export default Sort;