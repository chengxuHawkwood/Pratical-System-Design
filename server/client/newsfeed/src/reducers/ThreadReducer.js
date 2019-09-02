import {CREATE_MESSAGE_THREAD} from '../actions/types'
export const threadReducer = (state={}, action)=>{
    switch(action.type){
        case CREATE_MESSAGE_THREAD:
            return action.payload;
        default: 
            return state;
    }
}