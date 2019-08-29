import {FETCH_FOLLOWERS} from '../actions/types'
import _ from 'lodash'
export const follwerReducer=(state={fake:-1}, action)=>{
    switch(action.type){
        case FETCH_FOLLOWERS:
            return {..._.mapKeys(action.payload, '_id')}
        default: return state;
    }
}
