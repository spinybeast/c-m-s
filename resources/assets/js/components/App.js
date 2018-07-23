import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {I18n} from 'react-i18nify';

import en from '../lang/en.json';
import ru from '../lang/ru.json';

import {Portfolio} from "../pages/Portfolio";
import {Home} from "../pages/Home";
import Reviews from "../pages/Reviews";
import Contact from "../pages/Contact";

class App extends Component {
    constructor(props) {
        super(props);
        I18n.setTranslations({
            en: en,
            ru: ru
        });
        I18n.setLocale('en');
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/portfolio' component={Portfolio}/>
                    <Route path='/reviews' component={Reviews}/>
                    <Route path='/contact' component={Contact}/>
                </Switch>
            </Router>
        );
    }
}

export default App;