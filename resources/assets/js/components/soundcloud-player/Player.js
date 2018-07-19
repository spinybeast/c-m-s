import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {CLIENT_ID} from './constants/auth';
import Track from "./Track";
import * as actions from "./actions";


class Player extends Component {
    componentDidUpdate() {

        const audioElement = ReactDOM.findDOMNode(this.refs.audio);

        if (!audioElement) {
            return;
        }

        const {activeTrack, playing} = this.props;

        if (activeTrack && playing) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }

    render() {
        const {tags = [], tracks = [], activeTrack, onSelectTag} = this.props;

        return (
            <div>
                <div>
                    <select name="tags" onChange={(e) => onSelectTag(e.target.value)}>
                        {tags.map((tag, index) => <option key={index} value={tag}>{tag}</option>)}
                    </select>


                </div>
                <div>
                    {tracks.map((track, index) => <Track key={index} track={track}/>)}
                    {
                        activeTrack &&
                        <audio id="audio"
                               ref="audio"
                               src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`}
                        >
                        </audio>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {tags, tracks, activeTag, activeTrack, playing} = state.track;
    return {
        tags,
        activeTrack,
        playing,
        tracks: _.filter(tracks, (track) => {
            return !activeTag || ~track.tags.indexOf(activeTag);
        }),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectTag: bindActionCreators(actions.selectTag, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);