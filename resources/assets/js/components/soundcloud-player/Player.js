import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Translate } from 'react-i18nify';
import Select from 'react-select';

import Track from './Track';
import ActiveTrack from './ActiveTrack';
import { Loader } from '../Loader'
import * as actions from '../../actions';

class Player extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectedOption) {
        const {onSelectTag} = this.props;
        onSelectTag(selectedOption.value);
    };

    render() {
        const {tags = [], tracks = [], activeTag, loading} = this.props;

        if (loading) {
            return <Loader/>;
        }

        return (
            <Fragment>
                <ActiveTrack/>
                {
                    tracks.length > 0 ?
                        <div className="container">
                            <div className="row">
                                <Select className="col-12"
                                        classNamePrefix="select-genre"
                                        onChange={this.handleChange}
                                        options={tags.map((tag) => {
                                            return {value: tag, label: tag}
                                        })}
                                />

                                <div>
                                    {tracks.map((track, index) => <Track key={index} track={track}/>)}
                                </div>
                            </div>
                        </div> :
                        <div className="empty-portfolio">
                            <Translate value="pages.portfolio.cantLoad"/>&nbsp;
                            <a href="http://soundcloud.com/tony-cyclonez" target="_blank">
                                <i className="fa fa-soundcloud">&nbsp;</i>
                                Soundcloud
                            </a>!
                        </div>
                }
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const {tags, tracks, activeTag, activeTrack, loading} = state.portfolio;
    return {
        tags,
        activeTag,
        activeTrack,
        loading,
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
