import React, { Fragment } from 'react';
import { Translate } from 'react-i18nify';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TelegramIcon } from '../components/TelegramIcon';

export default function Contact() {
    return (
        <Fragment>
            <div className="wrapper contact">
                <Header />
                <main className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 social">
                            <div className="mb-3 pb-3 text-uppercase font-weight-bold hr">
                                <Translate className="title" tag="p" value="pages.contact.useContacts" />:
                            </div>
                            <div className="contact-links">
                                <a href="https://t.me/TonyCycloneZ" className="contact-link" target="_blank" rel="noreferrer">
                                    <span className="contact-link__icon" aria-hidden="true">
                                        <TelegramIcon />
                                    </span>
                                    <span>TonyCycloneZ</span>
                                </a>
                                <a href="https://vk.com/cyclone_drummer" className="contact-link" target="_blank" rel="noreferrer">
                                    <i className="fa fa-vk contact-link__icon" aria-hidden="true" />
                                    <span>cyclone_drummer</span>
                                </a>
                                <a href="mailto:composer.cyclonez@gmail.com" className="contact-link">
                                    <i className="fa fa-envelope contact-link__icon" aria-hidden="true" />
                                    <span>composer.cyclonez@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </Fragment>
    );
}
