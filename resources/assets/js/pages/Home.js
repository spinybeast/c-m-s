import React from 'react';
import {Translate} from 'react-i18nify';

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
                                        <Translate value="pages.home.whatWeDo" dangerousHTML={true}/>
                                    </div>
                                    <a className="btn btn-opacity" href="#/contact">
                                        <Translate value="pages.home.leaveRequest"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 main-feature">
                            <div className="trailers">
                                <h4 className="text-uppercase text-bold">
                                    <Translate value="pages.home.features.trailers.title"/>
                                </h4>
                                <p className="text"><Translate value="pages.home.features.trailers.description"/></p>
                            </div>
                        </div>
                        <div className="col-lg-4 main-feature">
                            <div className="soundtrack">
                                <h4 className="text-uppercase text-bold">
                                    <Translate value="pages.home.features.soundtracks.title"/>
                                </h4>
                                <p className="text"><Translate value="pages.home.features.soundtracks.description"/></p>
                            </div>
                        </div>
                        <div className="col-lg-4 main-feature">
                            <div className="advertisement">
                                <h4 className="text-uppercase text-bold">
                                    <Translate value="pages.home.features.advertisement.title"/>
                                </h4>
                                <p className="text"><Translate value="pages.home.features.advertisement.description"/></p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
        <Footer/>
    </div>
);