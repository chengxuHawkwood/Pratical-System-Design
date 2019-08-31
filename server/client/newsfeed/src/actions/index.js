import history from '../history';
import axios from 'axios';
import {FETCH_USER, ERROR, PAGINATION ,CREATE_POST, FETCH_POSTS, FETCH_FOLLOWERS, FOLLOW} from './types'

export const fetchUser=()=>async (dispatch)=>{
   const user =  await axios.get('/api/current_user');
   dispatch({type:FETCH_USER, payload:user.data });
};

export const createPost = (formValues)=> async(dispatch)=>{
   try{
      const response = await axios.post('/api/posts', {...formValues});

      dispatch({type:CREATE_POST, payload: response.data})
      history.push('/');
      
   }catch(err){
      dispatch({type:ERROR, payload:429})
      history.push('/ErrorPage');
   }

  
};

export const fetchOwnPosts = (offset)=> async(dispatch, getState)=>{
   dispatch({type: PAGINATION, payload: offset})
   const response = await axios.get('/api/posts', {
      params: {
         offset : getState().pageoffset
       }
   });
   dispatch({type: FETCH_POSTS, payload:response.data})
   
}

export const follow = (follow_id) =>async(dispatch, getState)=>{
   const user =  getState().user
   if(!user.follows.includes(follow_id)) user.follows.push(follow_id);
   await axios.patch('/api/users', user);
   await fetchUser();
   history.push('/')
   

}

export const unfollow = (follow_id) =>async(dispatch, getState)=>{
   let user =  getState().user
   user.follows=user.follows.filter(e=>e!==follow_id)
   await axios.patch('/api/users', user);
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