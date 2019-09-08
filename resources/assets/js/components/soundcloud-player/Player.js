import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Translate} from 'react-i18nify';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';

import Track from './Track';
import ActiveTrack from './ActiveTrack';
import {Loader} from '../Loader'
import * as actions from '../../actions';
import {PER_PAGE} from '../../constants/pagination';

class Player extends Component {
    constructor() {
        super();
        this.handleChangeGenre = this.handleChangeGenre.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleChangeGenre(selectedOption) {
        const {onSelectTag, onChangePage} = this.props;
        onSelectTag(selectedOption.value);
        onChangePage(0);
    };

    handleChangePage(data) {
        const {onChangePage} = this.props;
        onChangePage(data.selected);
    };

    render() {
        const {tags = [], tracks = [], activeTag, loading, pageCount} = this.props;

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
                                            onChange={this.handleChangeGenre}
                                            value={{value: activeTag, label: activeTag}}
                                            options={tags.map((tag) => {
                                                return {value: tag, label: tag}
                                            })}
                                    />
                                </div>
                                <div className="tracks d-flex pt-3 w-100">
                                    {tracks.map((track, index) => <Track key={index} track={track}/>)}
                                </div>
                                {pageCount > 1 &&
                                <div className="col-12 d-flex align-items-end">
                                    <ReactPaginate
                                        pageCount={pageCount}
                                        pageRangeDisplayed={pageCount}
                                        onPageChange={this.handleChangePage}
                                        containerClassName={'pagination'}
                                        nextLabel={'>'}
                                        previousLabel={'<'}
                                    />
                                </div>}
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
    const {tags, tracks, activeTag, activeTrack, loading, currentPage} = state.portfolio;
    const filteredTracks = _.filter(tracks, (track) => {
        return !activeTag || ~track.tags.indexOf(activeTag);
    });
    const paginatedTracks = _.take(_.drop(filteredTracks, PER_PAGE * currentPage), PER_PAGE);
    return {
        tags,
        activeTag,
        activeTrack,
        loading,
        currentPage,
        tracks: paginatedTracks,
        pageCount: Math.round(filteredTracks.length/PER_PAGE)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectTag: bindActionCreators(actions.selectTag, dispatch),
        onChangePage: bindActionCreators(actions.changePage, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
