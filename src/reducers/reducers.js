import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, SET_USER } from "../actions/actions";

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            console.log('SET_MOVIES reducer reached');
            return action.value;
        default:
            return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            return action.value;
        default:
            return state;
    }
}

const moviesAPP = combineReducers({
    visibilityFilter,
    movies,
    user
});

export default moviesAPP;