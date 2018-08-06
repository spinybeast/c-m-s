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
        case actionTypes.FETCH_TRACKS_START:
            return fetchTracksStart(state);
        case actionTypes.FETCH_TRACKS_SUCCESS:
            return fetchTracksSuccess(state, action);
        case actionTypes.FETCH_TRACKS_ERROR:
            return fetchTracksError(state);
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

function fetchTracksStart(state) {
    return {...state, loading: true};
}

function fetchTracksSuccess(state, action) {
    const {tracks} = action;
    return {...state, tracks: tracks, loading: false};
}

function fetchTracksError(state) {
    return {...state, loading: false};
}


