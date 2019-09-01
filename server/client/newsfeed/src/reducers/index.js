import {combineReducers} from 'redux';
import {authUserReducer} from './authUserReducer';
import {reducer as formReducer}  from 'redux-form'
import {postReducer} from './postReducer';
import {tofollwerReducer} from './tofollwerReducer'
import {ErrorStatusReducer} from './ErrorStatusReducer';
import {PageReducer} from './PageReducer';
import {followerReducer} from './followerReducer'
import {friendsReducer} from './friendsReducer'
export default combineReducers({
    user: authUserReducer,
    form: formReducer,
    posts: postReducer,
    tofollowers : tofollwerReducer,
    followers:followerReducer,
    status: ErrorStatusReducer,
    pageoffset: PageReducer,
    friends: friendsReducer
});