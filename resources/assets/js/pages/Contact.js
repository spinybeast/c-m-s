import React, {Component, Fragment} from 'react';
import axios from 'axios';
import _ from 'lodash';
import {I18n, Translate} from 'react-i18nify';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import Messages from "../components/Messages";

const initialData = {
    name: '',
    email: '',
    text: ''
};

export default class Contact extends Component {
    constructor() {
        super();
        this.state = {
            data: _.clone(initialData),
            message: '',
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        await axios.post('api/contact', this.state.data).then(result => {
            if (result.data.success) {
                this.setState({
                    data: _.clone(initialData),
                    message: result.data.message,
                    errors: []
                });
            } else {
                this.setState({
                    message: '',
                    errors: result.data.errors
                });
            }
        }).catch(error => {
            console.log('error', error);
        });
    }

    render() {
        return (
            <Fragment>
                <div className="wrapper contact">
                    <Header/>
                    <main className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <Messages message={this.state.message} errors={this.state.errors}/>
                                <Translate className="title" tag="p" value="pages.contact.leaveMessage"/>

                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input type="text"
                                               name="name"
                                               className="form-control transparent"
                                               placeholder={I18n.t('pages.reviews.contact.name')}
                                               autoComplete="off"
                                               required
                                               onChange={this.handleChange}
                                               value={this.state.data.name}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="email"
                                               name="email"
                                               className="form-control transparent"
                                               placeholder={I18n.t('pages.reviews.contact.email')}
                                               autoComplete="off"
                                               required
                                               onChange={this.handleChange}
                                               value={this.state.data.email}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            rows="4"
                                            name="text"
                                            className="form-control transparent"
                                            placeholder={I18n.t('pages.reviews.contact.message')}
                                            required
                                            onChange={this.handleChange}
                                            value={this.state.data.text}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-white">
                                            <Translate value="pages.reviews.popup.send"/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-5 offset-md-1 social">
                                <Translate className="title" tag="p" value="pages.contact.orUseContacts"/>
                                <div className="icons">
                                    <p>
                                        <span className="skype"></span>
                                        <a href="skype:cyberton11?chat">cyberton11</a>
                                    </p>
                                    <p>
                                        <span className="mail"></span>
                                        <a href="mailto:cyberton@mail.ru">cyberton@mail.ru</a>
                                    </p>
                                    <p>
                                        <span className="vk"></span>
                                        <a href="https://vk.com/cyclone_drummer" target="_blank">cyclone_drummer</a>
                                    </p>
                                    <p>
                                        <span className="vk"></span>
                                        <a href="https://vk.com/cyclone_music_space"
                                           target="_blank">cyclone_music_space</a>
                                    </p>
                                    <p>
                                        <span className="cloud"></span>
                                        <a href="https://soundcloud.com/tony-cyclonez" target="_blank">tony-cyclonez</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <Footer/>
            </Fragment>
        );
    }
}