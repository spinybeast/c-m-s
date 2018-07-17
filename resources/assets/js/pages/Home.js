import React from 'react';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';

export const Home = () => (
    <div>
        <div className="wrapper home">
            <Header/>
            <main>
                <div className="jumbotron">
                    <div className="main-cover">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-6 text-right">
                                    <h1 className="title text-uppercase">Cyclone<br/>music space</h1>
                                    <div className="main-description">
                                        <b>What we do:</b>
                                        <ul>
                                            <li>Composing OST for games</li>
                                            <li>Make in-game sounds and sound fx’s</li>
                                            <li>We make sound and music for trailers and advertising visual track</li>
                                        </ul>
                                    </div>
                                    <a className="btn btn-opacity" href="#/contact">Leave request</a>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row" style={{marginBottom: 30}}>
                        <div className="col-lg-4 main-feature">
                            <div className="trailers">
                                <h4 className="text-uppercase text-bold" translate="">Trailers main</h4>
                                <p className="text">Trailers main description</p>
                            </div>
                        </div>
                        <div className="col-lg-4 main-feature">
                            <div className="soundtrack">
                                <h4 className="text-uppercase text-bold">Soundtracks main</h4>
                                <p className="text">Soundtracks main description</p>
                            </div>
                        </div>
                        <div className="col-lg-4 main-feature">
                            <div className="advertisement">
                                <h4 className="text-uppercase text-bold">Advert main</h4>
                                <p className="text">Advert main description</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
        <Footer/>
    </div>
);