import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from "./navigation/Navigation";
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Navigation/>
    </BrowserRouter>,
    document.getElementById('context')
);