import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import Track from "./Track";
import ActiveTrack from "./ActiveTrack";
import * as actions from "./actions";


class Player extends Component {
    render() {
        const {tags = [], tracks = [], activeTag, onSelectTag} = this.props;

        return (
            <div>
                <ActiveTrack/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="scroll">
                                {tags.map((tag, index) =>
                                    <div key={index}
                                         className={'tag' + (activeTag === tag ? ' active' : '')}
                                         onClick={() => onSelectTag(tag)}>
                                        {tag}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="scroll">
                                {tracks.map((track, index) => <Track key={index} track={track}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {tags, tracks, activeTag, activeTrack} = state.data;
    return {
        tags,
        activeTag,
        activeTrack,
        tracks: _.filter(tracks, (track) => {
            return !activeTag || ~track.tags.indexOf(activeTag);
        })
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectTag: bindActionCreators(actions.selectTag, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);