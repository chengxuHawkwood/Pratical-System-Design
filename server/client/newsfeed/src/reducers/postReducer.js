import _ from 'lodash'
import {FETCH_POSTS} from '../actions/types'
export const postReducer=(state={}, action)=>{
    switch (action.type){
        case FETCH_POSTS:
            return {...state, ..._.mapKeys(action.payload,'_id')}
        default:
            return state;
    }
};