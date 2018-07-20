import * as actionTypes from '../constants/actionTypes';

const initialState = {
    playing: false,
    progress: 0,
    volume: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_PLAY:
            return togglePlay(state);
        case actionTypes.SET_VOLUME:
            return setVolume(state, action);
        case actionTypes.SET_PROGRESS:
            return setProgress(state, action);
    }
    return state;
}

function setVolume(state, action) {
    const {volume} = action;
    return {...state, volume: volume};
}

function setProgress(state, action) {
    const {progress} = action;
    return {...state, progress: progress};
}

function togglePlay(state) {
    return {...state, playing: !state.playing};
}

