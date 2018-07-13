require('./bootstrap');

import React from 'react';
import {render} from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';

import {Header} from './components/Header';

render(
    <Router>
        <Header/>
    </Router>,
    document.getElementById('app')
);
