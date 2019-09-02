import { SEND_MESSAGE, FETCH_MESSAGES } from '../actions/types'
export const chatMessageReducer = (state=[],action)=>{
    switch(action.type){
        case SEND_MESSAGE:
            return action.payload;
        case FETCH_MESSAGES:
            return action.payload;
        default:
            return state;
    }
}