import {FETCH_ALREADY_FOLLOWERS} from '../actions/types'
import _ from 'lodash'
export const followerReducer = (state=[], action)=>{
    switch(action.type){
        case FETCH_ALREADY_FOLLOWERS:
            
            return {...action.payload}
        default:
            return state;
    }

}