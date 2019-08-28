import {combineReducers} from 'redux';
import {authUserReducer} from './authUserReducer';
import {reducer as formReducer}  from 'redux-form'
import {postReducer} from './postReducer';
export default combineReducers({
    user: authUserReducer,
    form: formReducer,
    posts:postReducer,
});