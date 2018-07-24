require('./bootstrap');

import React from 'react';
import {render} from 'react-dom';

import App from './components/App';

if (document.getElementById('app')) {
    render(
        <App/>,
        document.getElementById('app')
    );
}
