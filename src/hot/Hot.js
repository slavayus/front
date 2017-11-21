import React, {Component} from 'react';
import {connect} from 'react-redux';
import HotProducts from "./HotProducts";

class Hot extends Component {
    render() {
        return (
            <HotProducts store={this.props.hotElements}/>
        );
    }
}

export default connect(
    state => ({
        hotElements: state
    }),
    dispatch => ({})
)(Hot);
