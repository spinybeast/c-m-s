import SC from 'soundcloud';
import _ from 'lodash';

import * as actionTypes from '../constants/actionTypes';
import {CLIENT_ID, USER_ID} from '../constants/auth';

export const setTags = (tags) => ({
    type: actionTypes.TAGS_SET,
    tags
});

export const selectTag = (tag) => ({
    type: actionTypes.TAG_SELECTED,
    tag
});

export const selectTrack = (track) => ({
    type: actionTypes.TRACK_SELECTED,
    track
});

export const changePage = (page) => ({
    type: actionTypes.PAGE_CHANGED,
    page
});

export const fetchTracks = () => dispatch => {
    dispatch(fetchTracksStart());

    SC.initialize({client_id: CLIENT_ID});
    SC.get('/users/' + USER_ID + '/tracks', {
        limit: 200
    }).then(tracks => {
        dispatch(fetchTracksSuccess(tracks));
        dispatch(selectTrack(_.first(tracks)));

        const tags = prepareTags(tracks);
        if (tags.length) {
            dispatch(setTags(tags));
            dispatch(selectTag(_.first(tags)));
        }
    }).catch(error => {
        console.log('error', error);
        dispatch(fetchTracksError());
    });

};

const fetchTracksStart = () => ({
    type: actionTypes.FETCH_TRACKS_START
});

const fetchTracksSuccess = (tracks) => ({
    type: actionTypes.FETCH_TRACKS_SUCCESS,
    tracks
});

const fetchTracksError = () => ({
    type: actionTypes.FETCH_TRACKS_ERROR
});

const prepareTags = (tracks) => {
    tracks.map((track) => {
        track.tags = ['all'];
        let tags = track.tag_list.split(' ');
        tags.push(track.genre);
        _.compact(tags).map((tag) => {
            tag = tag.toLowerCase();
            if (tag !== 'soundtrack' && track.tags.indexOf(tag) === -1) {
                track.tags.push(tag);
            }
        });
    });
    return _.uniq(_.flatten(_.map(tracks, 'tags')));
};