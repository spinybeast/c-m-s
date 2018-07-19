import * as actionTypes from '../constants/actionTypes';

export const setTags = (tags) => ({
    type: actionTypes.TAGS_SET,
    tags
});
export const selectTag = (tag) => ({
    type: actionTypes.TAG_SELECTED,
    tag
});
export const setTracks = (tracks) => ({
    type: actionTypes.TRACKS_SET,
    tracks
});

export const playTrack = (track) => ({
    type: actionTypes.TRACK_PLAY,
    track
});

export const pauseTrack = (track) => ({
    type: actionTypes.TRACK_PAUSE,
    track
});
