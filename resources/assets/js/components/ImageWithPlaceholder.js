import React, { Component, Fragment } from 'react';

export default class ImageWithPlaceholder extends Component {
    constructor() {
        super();
        this.state = {loaded: false};
    }

    render() {
        const {src, alt} = this.props;
        const {loaded} = this.state;
        return (
            <Fragment>
                {!loaded || !src ? (
                    <img className="img-fluid" src='/img/track-placeholder.png' alt={alt}/>
                ) : null}
                { src && <img
                    className="img-fluid"
                    src={src}
                    alt={alt}
                    style={!loaded ? { display: 'none' } : {}}
                    onLoad={() => this.setState({loaded: true})}
                /> }
            </Fragment>
        );
    }
}
