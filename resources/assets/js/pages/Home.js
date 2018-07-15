import React from 'react';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';

export const Home = () => (
    <div>
        <div className="wrapper">
            <Header/>
            <main className="container">
                Hello i'm homepage
            </main>
        </div>
        <Footer/>
    </div>
);