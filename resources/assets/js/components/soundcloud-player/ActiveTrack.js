import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {CLIENT_ID} from '../../constants/auth';
import * as actions from '../../actions';


class ActiveTrack extends Component {

    componentDidUpdate() {
        const audio = ReactDOM.findDOMNode(this.refs.audio);
        const {activeTrack, playing} = this.props;
        if (!audio || !activeTrack) {
            return;
        }

        playing ? audio.play() : audio.pause();

    }

    seek(e) {
        const audio = ReactDOM.findDOMNode(this.refs.audio);
        let percent = ActiveTrack.seekCoordinates(e);
        audio.currentTime = percent * audio.duration || 0;
    }

    seekVolume(e) {
        const audio = ReactDOM.findDOMNode(this.refs.audio);
        audio.volume = ActiveTrack.seekCoordinates(e);
    }

    static seekCoordinates(e) {
        return e.nativeEvent.offsetX / e.target.offsetWidth || (e.nativeEvent.layerX - e.target.offsetLeft) / e.target.offsetWidth;
    }

    static formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.round(time - minutes * 60);

        if (seconds.toString().length === 1) {
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
    }

    render() {
        const {activeTrack, onTimeUpdate, onVolumeChange, onTogglePlay, playing, currentTime, volume} = this.props;

        return (
            <div className="player">
                <div className="container">
                    <div className="row d-flex flex-row justify-content-between align-items-center">
                        <div className="col-2 col-sm-1">
                            <button onClick={onTogglePlay} className="play-button">
                                {
                                    playing ?
                                        <svg className="pause" viewBox="0 0 30 30">
                                            <path d="M4 4 H12 V28 H4 z M20 4 H28 V28 H20 z "></path>
                                        </svg>
                                        :
                                        <svg className="play" viewBox="0 0 30 30">
                                            <path d="M4 4 L28 16 L4 28 z "></path>
                                        </svg>

                                }
                            </button>
                        </div>
                        <div className="col-6 col-sm-7">
                            <div className="title">{activeTrack.title}</div>
                            <progress
                                onClick={this.seek.bind(this)}
                                value={activeTrack.id ? (currentTime / (activeTrack.duration / 1000)) : ''}>
                            </progress>
                        </div>
                        <div className="col-1 pl-sm-0">
                            <span>{activeTrack.id ? ActiveTrack.formatTime(currentTime) : ''}</span>
                            <span className="d-none d-sm-inline">
                                &nbsp;/&nbsp;
                                {activeTrack.id ? ActiveTrack.formatTime(activeTrack.duration / 1000) : ''}
                            </span>
                        </div>
                        <div className="col-3 d-flex flex-row align-items-center pl-sm-4">
                            <i className="fa fa-volume-up"></i>
                            <progress value={volume || 0.5}
                                      onClick={this.seekVolume.bind(this)}>
                            </progress>
                        </div>
                    </div>
                    {activeTrack.id &&
                    <audio id="audio"
                           ref="audio"
                           src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`}
                           onTimeUpdate={(e) => onTimeUpdate(e.target.currentTime)}
                           onVolumeChange={(e) => onVolumeChange(e.target.volume)}
                    >
                    </audio>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {activeTrack} = state.portfolio;
    const {playing, currentTime, volume} = state.activeTrack;
    return {
        activeTrack,
        playing,
        currentTime,
        volume
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onTimeUpdate: bindActionCreators(actions.setCurrentTime, dispatch),
        onVolumeChange: bindActionCreators(actions.setVolume, dispatch),
        onTogglePlay: bindActionCreators(actions.togglePlay, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTrack);