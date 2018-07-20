import * as actionTypes from '../constants/actionTypes';

export const setCurrentTime = (currentTime) => ({
    type: actionTypes.SET_CURRENT_TIME,
    currentTime
});

export const setVolume = (volume) => ({
    type: actionTypes.SET_VOLUME,
    volume
});

export const togglePlay = () => ({
    type: actionTypes.TOGGLE_PLAY
});
