import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {I18n} from 'react-i18nify';

import configureStore from '../stores/configureStore';

import en from '../lang/en.json';
import ru from '../lang/ru.json';

import {Home} from '../pages/Home';
import Portfolio from '../pages/Portfolio';
import Reviews from '../pages/Reviews';
import Contact from '../pages/Contact';

const store = configureStore();

class App extends Component {
    componentDidMount() {
        I18n.setTranslations({
            en: en,
            ru: ru
        });
        const lang = window.location.pathname.split('/')[1];
        I18n.setLocale(lang || 'en');
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/portfolio' component={Portfolio}/>
                        <Route path='/reviews' component={Reviews}/>
                        <Route path='/contact' component={Contact}/>
                        <Redirect from="/reviews" to="/portfolio" />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
