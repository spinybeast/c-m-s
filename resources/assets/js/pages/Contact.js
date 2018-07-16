import React, {Component} from 'react';
import axios from 'axios';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';

export default class Contact extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                name: '',
                email: '',
                message: ''
            },
            message: '',
            errors: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let data = this.state.data;
        data[e.target.name] = e.target.value;

        this.setState({
            data: data
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        await axios.post('api/contact', this.state.data).then(result => {
            if (result.data.success) {
                this.setState({
                    message: result.data.message
                });
            } else {
                this.setState({
                    errors: result.data.errors
                });
            }
        }).catch(error => {
            console.log('error', error);
        })
    }

    render() {
        let message, errors;
        if (this.state.message.length) {
            message = <div className="message">{this.state.message}</div>
        }
        if (this.state.errors.length) {
            errors = <div className="errors">
                {this.state.errors.map(error => {
                    return <div>{error}</div>
                })}
            </div>
        }
        return (
            <div>
                <div className="wrapper contact">
                    <Header/>
                    <main className="container">
                        <div className="row">
                            <div className="col-md-6">
                                {message}
                                {errors}
                                <p className="title">
                                    You can leave us a message using the form below
                                </p>

                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input type="text"
                                               name="name"
                                               className="form-control transparent"
                                               placeholder="your name"
                                               autoComplete="off"
                                               required
                                               onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="email"
                                               name="email"
                                               className="form-control transparent"
                                               placeholder="your email"
                                               autoComplete="off"
                                               required
                                               onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            rows="4"
                                            name="message"
                                            className="form-control transparent"
                                            placeholder="message"
                                            required
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-white">Send</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-5 offset-md-1 social">
                                <p className="title">Or use contacts</p>
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
            </div>
        );
    }
}