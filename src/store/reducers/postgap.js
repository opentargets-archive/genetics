import { combineReducers } from 'redux';
import {
    REQUEST_EVIDENCE_STRINGS,
    RECEIVE_EVIDENCE_STRINGS,
} from '../actions/postgap.js';

function evidenceStrings(state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
}, action) {
    switch (action.type) {
        case REQUEST_EVIDENCE_STRINGS:
            return { ...state, isFetching: true };
        case RECEIVE_EVIDENCE_STRINGS:
            return { ...state, isFetching: false, items: action.items };
        default:
            return state;
    }
}

const rootReducer = combineReducers({ evidenceStrings });

export default rootReducer;
