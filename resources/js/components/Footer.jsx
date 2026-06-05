import React from 'react';
import { TelegramIcon } from './TelegramIcon';

export const Footer = () => (
    <footer className="footer">
        <div className="container d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-row copyright">
                {new Date().getFullYear()} &copy; Cyclone Music Space
                <span className="d-none d-sm-inline">. All rights reserved.</span>
            </div>
            <div className="footer-social">
                <a
                    className="footer-social__link"
                    href="https://t.me/TonyCycloneZ"
                    target="_blank"
                    rel="noreferrer"
                    title="Telegram"
                >
                    <TelegramIcon />
                </a>
                <a
                    className="footer-social__link"
                    href="https://vk.com/cyclone_drummer"
                    target="_blank"
                    rel="noreferrer"
                    title="VK"
                >
                    <i className="fa fa-vk" aria-hidden="true" />
                </a>
            </div>
        </div>
    </footer>
);
