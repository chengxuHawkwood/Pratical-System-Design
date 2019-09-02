import history from '../history';
import axios from 'axios';
import {FETCH_USER, ERROR, PAGINATION ,CREATE_POST, 
      FETCH_POSTS, FETCH_FOLLOWERS, FOLLOW, 
      FETCH_ALREADY_FOLLOWERS, FETCH_FRIENDS} from './types'
import {create_message_thread as cmt, send_message as sendM, fetch_messages as fm} from './messageactions'
export const create_message_thread = cmt
export const send_message = sendM
export const fetch_messages = fm
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

export const follow = (follow_id) =>async(dispatch)=>{
   // const user =  getState().user
   // if(!user.follows.includes(follow_id)) user.follows.push(follow_id);
   await axios.post('/api/friendship', {follow_id});
   await fetchUser();
   
   history.push('/')
   

}

export const unfollow = (follow_id) =>async(dispatch, getState)=>{
   await axios.delete('/api/friendship', {
      data:{follow_id}
   })
   history.push('/')
}


export const fetchfriends = ()=>async(dispatch)=>{
   const friends = await axios.get('/api/friendship',{
      params:{
         type: 'friends'
      }
   })
   dispatch({type:FETCH_FRIENDS,payload:friends.data})
}

export const fetchFollows=(formValues)=>async (dispatch)=>{
   const followers =  await axios.get('/api/users',  {
      params: {
         followee : formValues?formValues.Followee:-1
       }
   });
   const already_follower  =await axios.get('/api/friendship')
   dispatch({type:FETCH_ALREADY_FOLLOWERS, payload:already_follower.data});
   dispatch({type:FETCH_FOLLOWERS, payload:followers.data });
};