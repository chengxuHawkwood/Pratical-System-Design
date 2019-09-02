import {CREATE_MESSAGE_THREAD, SEND_MESSAGE, FETCH_MESSAGES} from '../actions/types'
import axios from 'axios';
import history from '../history';
export const create_message_thread = (participant_ids)=>async(dispatch)=>{
    const thread = await axios.post('/api/threads',{participant_ids});
    const userThread = await axios.get('/api/userthreads',{
        params:{
            thread_id:thread.data._id
        }
    })
    dispatch({type:CREATE_MESSAGE_THREAD, payload:userThread.data});
    history.push("/messages");
}

export const fetch_messages = (thread, offset)=>async(dispatch)=>{
    const showmessages =  await axios.get('/api/messages', {
        params:{
            thread:thread,
            offset:offset
        }
    });
    dispatch({type:FETCH_MESSAGES, payload:showmessages.data})
}

export const send_message = (form_values, thread)=>async(dispatch)=>{
    const showmessages =  await axios.post('/api/messages',{form_values:form_values, thread:thread})
    dispatch({type:SEND_MESSAGE, payload:showmessages.data});
}