import {combineReducers} from 'redux';

import portfolio from './portfolio';
import activeTrack from './activeTrack';
import reviews from './reviews';

export default combineReducers({
    portfolio,
    activeTrack,
    reviews
});