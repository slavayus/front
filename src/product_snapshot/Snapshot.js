import React from 'react';
import "../one/css/one.css";
import {apiPrefix, serverPort} from "../etc/config.json"
import SnapshotStore from "./SnapshotStore";


const createReactClass = require('create-react-class');

const messageConfirm = 'Вы действительно желаете приобрести этот товар?';

const Snapshot = createReactClass({
    getInitialState() {
        SnapshotStore.setUpConnection();
        SnapshotStore.loadProducts(this.props.match.params.id);
        return SnapshotStore.getProducts();
    },

    componentDidMount() {
        SnapshotStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        SnapshotStore.removeChangeListener();
    },

    onChange() {
        this.setState(SnapshotStore.getProducts())
    },

    render() {
        if (this.state.products.status) {
            return (
                <div className={"one"}>
                    <div className={"text_button"}>
                        <div id={"description"}>{this.state.products.data.description}</div>
                    </div>
                    <img className={"oneImg"}
                         src={require(`../one/img/${this.state.products.data.image_large_version}`)}
                         alt={"YEE"}/>
                </div>
            );
        } else {
            return (
                <div id='empty'>
                    <span>{this.state.products.data}</span>
                </div>
            )
        }
    }
});

export default Snapshot;