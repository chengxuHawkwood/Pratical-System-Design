import history from '../history';

import axios from 'axios';
import {FETCH_USER, CREATE_POST, FETCH_POSTS, FETCH_FOLLOWERS, FOLLOW} from './types'

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

export const follow = (follow_id) =>async(dispatch, getState)=>{
   const user =  getState().user
   if(!user.follows.includes(follow_id)) user.follows.push(follow_id);
   await axios.patch('/api/users', user);
   fetchUser();
   history.push('/')

}

export const fetchFollows=(formValues)=>async (dispatch)=>{
   const followers =  await axios.get('/api/users',  {
      params: {
         followee : formValues?formValues.Followee:-1
       }
   });
   dispatch({type:FETCH_FOLLOWERS, payload:followers.data });
};