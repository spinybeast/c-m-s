import React, {Component} from 'react';
import {Provider} from 'react-redux';
import SC from 'soundcloud';
import _ from 'lodash';

import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import Player from '../components/soundcloud-player/Player'
import configureStore from '../components/soundcloud-player/stores/configureStore';
import * as actions from '../components/soundcloud-player/actions';
import {CLIENT_ID, USER_ID} from '../components/soundcloud-player/constants/auth';

const store = configureStore();

export class Portfolio extends Component {
    componentDidMount() {
        SC.initialize({client_id: CLIENT_ID});
        SC.get('/tracks', {
            user_id: USER_ID,
            limit: 200
        }).then(function (tracks) {
            prepareTags(tracks);
            store.dispatch(actions.setTracks(tracks));
        });
    }

    render() {
        return (
            <div>
                <div className="wrapper portfolio">
                    <Header/>
                    <Provider store={store}>
                        <main className="container">
                            <Player/>
                        </main>
                    </Provider>
                </div>
                <Footer/>
            </div>
        );
    }
}

function prepareTags(tracks) {
    tracks.map((track) => {
        track.tags = track.genre ? [track.genre.toLowerCase()] : [];
        _.compact(track.tag_list.split(' ')).map((tag) => {
            tag = tag.toLowerCase();
            if (tag !== 'soundtrack' && track.tags.indexOf(tag) === -1) {
                track.tags.push(tag);
            }
        });
    });
    const tags = _.uniq(_.flatten(_.map(tracks, 'tags')));
    store.dispatch(actions.setTags(tags));
}