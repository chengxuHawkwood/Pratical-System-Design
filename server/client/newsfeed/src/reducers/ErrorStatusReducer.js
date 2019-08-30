import {ERROR} from '../actions/types'
export const ErrorStatusReducer = (state="", action)=>{
    switch (action.type){
        case ERROR:
            return action.payload;
        default: 
            return state;
    }
}