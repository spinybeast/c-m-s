import * as actionTypes from '../constants/actionTypes';
import axios from 'axios';

export const fetchReviews = () => dispatch => {
    dispatch(fetchReviewsStart());

    axios.get('api/review').then(response => {
        dispatch(fetchReviewsSuccess(response.data));
    }).catch(error => {
        console.log('error', error);
        dispatch(fetchReviewsError());
    });
};

const fetchReviewsStart = () => ({
    type: actionTypes.FETCH_REVIEWS_START
});

const fetchReviewsSuccess = (reviews) => ({
    type: actionTypes.FETCH_REVIEWS_SUCCESS,
    reviews
});

const fetchReviewsError = () => ({
    type: actionTypes.FETCH_REVIEWS_ERROR
});