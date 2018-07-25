import {combineReducers} from 'redux';

import portfolio from './portfolio';
import activeTrack from './activeTrack';

export default combineReducers({
    portfolio,
    activeTrack
});