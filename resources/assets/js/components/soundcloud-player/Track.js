import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Track extends Component {

    render() {
        const {track, activeTrack, playing, onSelectTrack, onTogglePlay} = this.props;
        return (
            <div className="track">
                <div className="row">
                    <div className="col-4">
                        <img src={track.artwork_url} alt={track.title} className="img-fluid"/>
                    </div>
                    <div className="col-8">
                        <p className="mb-0">{track.user.username}</p>
                        <p className="text-uppercase font-weight-bold">{track.title}</p>
                        <div className="row">
                            <div className="col-2">
                                {
                                    playing && activeTrack.id === track.id ?
                                        <button className="play-button"
                                            onClick={onTogglePlay}>
                                            <svg className="pause" viewBox="0 0 30 30">
                                                <path d="M4 4 H12 V28 H4 z M20 4 H28 V28 H20 z "></path>
                                            </svg>
                                        </button> :
                                        <button className="play-button"
                                            onClick={() => {if (!playing) {onTogglePlay()} onSelectTrack(track)}}>
                                            <svg className="play" viewBox="0 0 30 30">
                                                <path d="M4 4 L28 16 L4 28 z "></path>
                                            </svg>
                                        </button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {activeTrack} = state.portfolio;
    const {playing} = state.activeTrack;
    return {
        activeTrack,
        playing
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectTrack: bindActionCreators(actions.selectTrack, dispatch),
        onTogglePlay: bindActionCreators(actions.togglePlay, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
