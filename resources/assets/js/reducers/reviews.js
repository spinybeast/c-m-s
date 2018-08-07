import * as actionTypes from '../constants/actionTypes';

const initialState = {
    reviews: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_REVIEWS_START:
            return fetchReviewsStart(state);
        case actionTypes.FETCH_REVIEWS_SUCCESS:
            return fetchReviewsSuccess(state, action);
        case actionTypes.FETCH_REVIEWS_ERROR:
            return fetchReviewsError(state);
    }
    return state;
}

function fetchReviewsStart(state) {
    return {...state, loading: true};
}

function fetchReviewsSuccess(state, action) {
    const {reviews} = action;
    return {...state, reviews: reviews, loading: false};
}

function fetchReviewsError(state) {
    return {...state, loading: false};
}