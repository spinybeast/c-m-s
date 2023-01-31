import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { I18n } from 'react-i18nify';

import configureStore from '../stores/configureStore';

import en from '../lang/en.json';
import ru from '../lang/ru.json';

import { Home } from '../pages/Home';
import Portfolio from '../pages/Portfolio';
// import Reviews from '../pages/Reviews';
import Contact from '../pages/Contact';
import Video from "../pages/Video";

import { useWindowSize } from '../hooks/useWindowSize';

const store = configureStore();

function App () {
  const { height } = useWindowSize()

  useEffect(() => {
    I18n.setTranslations({
      en: en,
      ru: ru
    });
    const lang = window.location.pathname.split('/')[1];
    I18n.setLocale(lang || 'en');
  }, [])

  useEffect(() => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${height}px`)
    return () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', '100vh')
    }
  }, [height])

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact="true" path='/' element={<Home/>}/>
          <Route path='/portfolio' element={<Portfolio/>}/>
          <Route path='/video' element={<Video/>}/>
          <Route path='/reviews' element={<Navigate to="/portfolio"/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
