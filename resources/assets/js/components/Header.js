import React from 'react';
import {NavLink as Link} from 'react-router-dom'

export const Header = () => (
    <header>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <span className="blue">Cyclone&nbsp;</span>
                    Music Space
                </a>
                <div className="lang">
                    <a className="ru"></a>
                    <a className="en"></a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
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
    </header>
);

