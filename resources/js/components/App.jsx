import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import '../i18n';

import { Home } from '../pages/Home';
import Portfolio from '../pages/Portfolio';
import Contact from '../pages/Contact';
import Video from '../pages/Video';

import { useWindowSize } from '../hooks/useWindowSize';

function App() {
    const { height } = useWindowSize();

    useEffect(() => {
        const doc = document.documentElement;
        doc.style.setProperty('--app-height', `${height}px`);

        return () => {
            doc.style.setProperty('--app-height', '100vh');
        };
    }, [height]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/video" element={<Video />} />
                <Route path="/reviews" element={<Navigate to="/portfolio" />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
