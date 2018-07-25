import * as actionTypes from '../constants/actionTypes';

const initialState = {
    tags: [],
    tracks: [],
    activeTag: null,
    activeTrack: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.TAG_SELECTED:
            return selectTag(state, action);
        case actionTypes.TRACK_SELECTED:
            return selectTrack(state, action);
        case actionTypes.TAGS_SET:
            return setTags(state, action);
        case actionTypes.TRACKS_SET:
            return setTracks(state, action);
        case actionTypes.LOADING_SET:
            return setLoading(state, action);
    }
    return state;
}

function selectTag(state, action) {
    const {tag} = action;
    return {...state, activeTag: tag};
}

function selectTrack(state, action) {
    const {track} = action;
    return {...state, activeTrack: track};
}

function setTags(state, action) {
    const {tags} = action;
    return {...state, tags: tags};
}

function setTracks(state, action) {
    const {tracks} = action;
    return {...state, tracks: tracks, loading: false};
}

function setLoading(state, action) {
    const {loading} = action;
    return {...state, loading: loading};
}
