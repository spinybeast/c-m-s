import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import Player from '../components/soundcloud-player/Player'
import * as actions from '../actions';

class Portfolio extends Component {
    componentDidMount() {
        const {tracks, fetchTracks} = this.props;

        if (tracks.length === 0) {
            fetchTracks();
        }
    }

    render() {
        return (
            <Fragment>
                <div className="wrapper portfolio">
                    <Header/>
                    <main>
                        <Player/>
                    </main>
                </div>
                <Footer/>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const {tracks} = state.portfolio;
    return {tracks};
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTracks: () => {
            dispatch(actions.fetchTracks());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
