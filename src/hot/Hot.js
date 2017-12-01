import React, {Component} from 'react';

class Hot extends Component {
    render() {
        return (
            <div className='main'>
                {this.props.store.map((item, index) => (
                    <Element key={index} item={item}/>
                ))}
            </div>
        );
    }
}

export default Hot;
