import React from 'react';
import {Switch, Route, NavLink as Link} from 'react-router-dom'

import {Home} from './Home';
import {Portfolio} from './Portfolio';
import Reviews from './Reviews';
import {Contact} from './Contact';

export const Header = () => (
    <header>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <span className="blue">Cyclone&nbsp;</span>
                    Music Space
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" exact={true} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/portfolio">Portfolio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reviews">Reviews</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/portfolio' component={Portfolio}/>
            <Route path='/reviews' component={Reviews}/>
            <Route path='/contact' component={Contact}/>
        </Switch>
    </header>
);

