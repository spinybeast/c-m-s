import React from 'react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Player from '../components/soundcloud-player/Player'

function Portfolio () {
  return (
    <>
      <div className="wrapper portfolio">
        <Header/>
        <main>
          <Player/>
        </main>
      </div>
      <Footer/>
    </>
  );
}


export default Portfolio;
