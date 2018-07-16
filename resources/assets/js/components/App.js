import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import {Portfolio} from "../pages/Portfolio";
import {Home} from "../pages/Home";
import Reviews from "../pages/Reviews";
import Contact from "../pages/Contact";

export const App = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/portfolio' component={Portfolio}/>
            <Route path='/reviews' component={Reviews}/>
            <Route path='/contact' component={Contact}/>
        </Switch>
    </Router>
);