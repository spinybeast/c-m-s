import React from 'react';

export const Footer = () => (
    <footer className="footer">
        <div className="container d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-row copyright">{new Date().getFullYear()} &copy; Cyclone Music Space<span className="d-none d-sm-inline">. All rights reserved.</span></div>
            <div className="d-flex flex-row">
                <a className="btn btn-social-icon btn-vk" target="_blank" title="VK"
                   href="https://vk.com/cyclone_music_space">
                    <i className="fa fa-vk"></i>
                </a>
                {/*<a className="btn btn-social-icon btn-facebook" target="_blank" title="Facebook"
                   href="https://www.facebook.com/cyclone_music_space-720106248448490/">
                    <i className="fa fa-facebook"></i>
                </a>*/}
                <a className="btn btn-social-icon btn-soundcloud" target="_blank" title="Soundcloud"
                   href="https://soundcloud.com/tony-cyclonez">
                    <i className="fa fa-soundcloud"></i>
                </a>
            </div>
        </div>
    </footer>
);
