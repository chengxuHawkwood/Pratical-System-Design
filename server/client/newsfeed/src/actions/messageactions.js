import {CREATE_MESSAGE_THREAD} from '../actions/types'
import axios from 'axios';
import history from '../history';
export const create_message_thread = (participant_ids)=>async(dispatch)=>{
    const thread = await axios.post('/api/threads',{participant_ids});
    const userThread = await axios.get('/api/userthreads',{
        params:{
            thread_id:thread.data._id
        }
    })
    dispatch({type:CREATE_MESSAGE_THREAD, payload:userThread});
    history.push("/messages");
}