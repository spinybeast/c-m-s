import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Translate } from 'react-i18nify';

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src="/img/logo.png" alt="Cyclone Music Space" height={35} />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        aria-controls="navbarSupportedContent"
                        aria-expanded={menuOpen}
                        aria-label="Toggle navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>
                                    <Translate value="menu.home" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/portfolio" onClick={() => setMenuOpen(false)}>
                                    <Translate value="menu.portfolio" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/video" onClick={() => setMenuOpen(false)}>
                                    <Translate value="menu.video" />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact" onClick={() => setMenuOpen(false)}>
                                    <Translate value="menu.contact" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
