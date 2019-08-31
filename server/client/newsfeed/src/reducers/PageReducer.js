import {PAGINATION} from '../actions/types'

export const PageReducer=(state=0, action)=>{
    switch(action.type){
        case PAGINATION:
            return action.payload;
        default: 
            return state
    }

}