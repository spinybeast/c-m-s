import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {CLIENT_ID} from './constants/auth';
import * as actions from "./actions";


class ActiveTrack extends Component {

    componentDidUpdate() {
        const audio = ReactDOM.findDOMNode(this.refs.audio);
        if (!audio) {
            return;
        }

        const {activeTrack, playing} = this.props;
        if (activeTrack && playing) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    render() {
        const {activeTrack, onTimeUpdate, playing, progress, volume} = this.props;

        return (
            <div className="player">
                <div className="container">
                    <div className="row">
                        <div className="col-1">
                            {
                                playing ?
                                    <button className="button button-transparent">
                                        <svg className="pause" viewBox="0 0 30 30">
                                            <path d="M4 4 H12 V28 H4 z M20 4 H28 V28 H20 z "></path>
                                        </svg>
                                    </button> :
                                    <button className="button button-transparent">
                                        <svg className="play" viewBox="0 0 30 30">
                                            <path d="M4 4 L28 16 L4 28 z "></path>
                                        </svg>
                                    </button>
                            }

                        </div>
                        <div className="col-8">
                            <div>
                                <div className="pull-left">{activeTrack.title}</div>
                                <div className="pull-right">{progress}</div>
                            </div>
                            <progress className="progress" value={progress}>{progress}</progress>
                        </div>
                        <div className="col-3">
                            <i className="fa fa-volume-up"></i>
                            <progress className="progress" value={volume}>{volume}</progress>
                        </div>
                    </div>
                    {activeTrack.id &&
                    <audio id="audio"
                           ref="audio"
                           src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`}
                           onTimeUpdate={(e) => onTimeUpdate(e.target.currentTime, e.target.duration)}
                    >
                    </audio>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {activeTrack} = state.data;
    const {playing, progress, volume} = state.playing;
    return {
        activeTrack,
        playing,
        progress,
        volume
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onTimeUpdate: bindActionCreators(actions.setProgress, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTrack);