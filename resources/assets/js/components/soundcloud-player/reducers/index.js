import {combineReducers} from 'redux';

import data from './data';
import playing from './playing';

export default combineReducers({
    data,
    playing
});