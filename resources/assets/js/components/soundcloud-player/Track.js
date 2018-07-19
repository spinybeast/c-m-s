import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from "./actions";

class Track extends Component {

    render() {
        const {track, activeTrack, playing, onPlay, onPause} = this.props;
        return (
            <div className="track">
                {track.title}
                {
                    playing && activeTrack.id === track.id ?
                        <button type="button" onClick={() => onPause(track)}>Pause</button> :
                        <button type="button" onClick={() => onPlay(track)}>Play</button>
                }

            </div>

        );
    }
}

function mapStateToProps(state) {
    const {tracks, activeTrack, playing} = state.track;
    return {
        tracks,
        activeTrack,
        playing
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onPlay: bindActionCreators(actions.playTrack, dispatch),
        onPause: bindActionCreators(actions.pauseTrack, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
