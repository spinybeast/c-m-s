import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SC from 'soundcloud';
import _ from 'lodash';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import Player from '../components/soundcloud-player/Player'
import * as actions from '../actions';
import {CLIENT_ID, USER_ID} from '../constants/auth';

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.prepareTags = this.prepareTags.bind(this)
    }

    componentDidMount() {
        const {tracks, setTracks, selectTrack, setLoading} = this.props;

        if (tracks.length === 0) {
            SC.initialize({client_id: CLIENT_ID});
            setLoading(true);
            SC.get('/tracks', {
                user_id: USER_ID,
                limit: 200
            }).then(tracks => {
                this.prepareTags(tracks);
                setTracks(tracks);
                selectTrack(_.first(tracks));
            }).catch(error => {
                console.log('error', error);
                setLoading(false);
            });
        }

    }

    prepareTags(tracks) {
        const {setTags, selectTag} = this.props;

        tracks.map((track) => {
            track.tags = [];
            let tags = track.tag_list.split(' ');
            tags.push(track.genre);
            _.compact(tags).map((tag) => {
                tag = tag.toLowerCase();
                if (tag !== 'soundtrack' && track.tags.indexOf(tag) === -1) {
                    track.tags.push(tag);
                }
            });
        });
        const tags = _.uniq(_.flatten(_.map(tracks, 'tags')));
        if (tags.length) {
            setTags(tags);
            selectTag(_.first(tags));
        }
    }

    render() {
        return (
            <div>
                <div className="wrapper portfolio">
                    <Header/>
                    <main>
                        <Player/>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {tracks} = state.portfolio;
    return {tracks};
}

function mapDispatchToProps(dispatch) {
    return {
        setLoading: bindActionCreators(actions.setLoading, dispatch),
        setTracks: bindActionCreators(actions.setTracks, dispatch),
        setTags: bindActionCreators(actions.setTags, dispatch),
        selectTag: bindActionCreators(actions.selectTag, dispatch),
        selectTrack: bindActionCreators(actions.selectTrack, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
