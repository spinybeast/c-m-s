import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Translate} from 'react-i18nify';
import Select from 'react-select';

import Track from './Track';
import ActiveTrack from './ActiveTrack';
import {Loader} from '../Loader'
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
                                <div className="col-12 d-flex align-items-center pb-3 hr">
                                    <p className="col-md-3 mb-0 p-0 text-uppercase font-weight-bold choose-genre">
                                        <Translate value="pages.portfolio.chooseGenre"/>
                                    </p>
                                    <Select className="col-md-9 p-0"
                                            classNamePrefix="select-genre"
                                            onChange={this.handleChange}
                                            value={{value: activeTag, label: activeTag}}
                                            options={tags.map((tag) => {
                                                return {value: tag, label: tag}
                                            })}
                                    />
                                </div>
                                <div className="tracks d-flex pt-3 w-100">
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
