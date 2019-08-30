import {combineReducers} from 'redux';
import {authUserReducer} from './authUserReducer';
import {reducer as formReducer}  from 'redux-form'
import {postReducer} from './postReducer';
import {follwerReducer} from './follwerReducer'
import {ErrorStatusReducer} from './ErrorStatusReducer'
export default combineReducers({
    user: authUserReducer,
    form: formReducer,
    posts: postReducer,
    followers : follwerReducer,
    status: ErrorStatusReducer
});