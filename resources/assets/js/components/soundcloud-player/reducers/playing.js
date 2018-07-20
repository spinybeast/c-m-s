import * as actionTypes from '../constants/actionTypes';

const initialState = {
    playing: false,
    currentTime: 0,
    volume: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_PLAY:
            return togglePlay(state);
        case actionTypes.SET_VOLUME:
            return setVolume(state, action);
        case actionTypes.SET_CURRENT_TIME:
            return setCurrentTime(state, action);
    }
    return state;
}

function setVolume(state, action) {
    const {volume} = action;
    return {...state, volume: volume};
}

function setCurrentTime(state, action) {
    const {currentTime} = action;
    return {...state, currentTime: currentTime};
}

function togglePlay(state) {
    return {...state, playing: !state.playing};
}

