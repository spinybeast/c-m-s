import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'

import {Home} from './Home';
import {Portfolio} from './Portfolio';
import Reviews from './Reviews';
import {Contact} from './Contact';

export const Header = () => (
    <header>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
                <Link to="/reviews">Reviews</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/portfolio' component={Portfolio}/>
            <Route path='/reviews' component={Reviews}/>
            <Route path='/contact' component={Contact}/>
        </Switch>
    </header>
);

