import {FETCH_USER, FOLLOW} from '../actions/types'
export const authUserReducer = function(state=null, action){
    switch (action.type){
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}