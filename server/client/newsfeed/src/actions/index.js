import history from '../history';

import axios from 'axios';
import {FETCH_USER, CREATE_POST, FETCH_POSTS} from './types'

export const fetchUser=()=>async (dispatch)=>{
   const user =  await axios.get('/api/current_user');
   dispatch({type:FETCH_USER, payload:user.data });
};

export const createPost = (formValues)=> async(dispatch)=>{
   const response = await axios.post('/api/posts', {...formValues});
   dispatch({type:CREATE_POST, payload: response.data})
   history.push('/');
};

export const fetchOwnPosts = ()=> async(dispatch)=>{
   const response = await axios.get('/api/posts');
   dispatch({type: FETCH_POSTS, payload:response.data})
}