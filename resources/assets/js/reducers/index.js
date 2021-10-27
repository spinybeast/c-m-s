import {combineReducers} from 'redux';

import reviews from './reviews';
import {reducer as form} from 'redux-form';

export default combineReducers({
    reviews,
    form
});
