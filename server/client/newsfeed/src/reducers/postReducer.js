import _ from 'lodash'
import {FETCH_POSTS, FOLLOW} from '../actions/types'
export const postReducer=(state={}, action)=>{
    switch (action.type){
        case FETCH_POSTS:
            return {..._.mapKeys(action.payload,'_id')}
        case FOLLOW:
            return {..._.mapKeys(action.payload,'_id')}
        default:
            return state;
    }
};