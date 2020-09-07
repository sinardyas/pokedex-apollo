import { combineReducers } from 'redux';

import { filter } from './filter.reducer';

const combiner = combineReducers({
    filter
});

export default combiner;