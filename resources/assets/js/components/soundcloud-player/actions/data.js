import * as actionTypes from '../constants/actionTypes';

export const setTags = (tags) => ({
    type: actionTypes.TAGS_SET,
    tags
});

export const setTracks = (tracks) => ({
    type: actionTypes.TRACKS_SET,
    tracks
});

export const selectTag = (tag) => ({
    type: actionTypes.TAG_SELECTED,
    tag
});

export const selectTrack = (track) => ({
    type: actionTypes.TRACK_SELECTED,
    track
});