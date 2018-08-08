import {combineReducers} from 'redux';

import portfolio from './portfolio';
import activeTrack from './activeTrack';
import reviews from './reviews';
import {reducer as form} from 'redux-form';

export default combineReducers({
    portfolio,
    activeTrack,
    reviews,
    form
});