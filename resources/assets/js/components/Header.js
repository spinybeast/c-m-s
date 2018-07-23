import React from 'react';
import {NavLink as Link} from 'react-router-dom'
import { I18n, Translate } from 'react-i18nify';

export const Header = () => (
    <header>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <span className="blue">Cyclone&nbsp;</span>
                    Music Space
                </a>
                <div className="lang">
                    <a className="ru" onClick={() => {I18n.setLocale('ru')}}></a>
                    <a className="en" onClick={() => {I18n.setLocale('en')}}></a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" exact={true} to="/">
                                <Translate value="menu.home"/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/portfolio">
                                <Translate value="menu.portfolio"/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reviews">
                                <Translate value="menu.reviews"/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                <Translate value="menu.contact"/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
);

