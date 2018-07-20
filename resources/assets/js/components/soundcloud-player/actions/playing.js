import * as actionTypes from '../constants/actionTypes';

export const setProgress = (currentTime, duration) => {
    let progress = currentTime / duration;
    return {
        type: actionTypes.SET_PROGRESS,
        progress
    }
};
export const setVolume = (volume) => ({
    type: actionTypes.SET_VOLUME,
    volume
});

export const togglePlay = () => ({
    type: actionTypes.TOGGLE_PLAY
});
