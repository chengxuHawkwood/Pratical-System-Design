import React from 'react'
import ChatHistory from './ChatHistory'
import ChatInput from './ChatInput'
import {connect} from 'react-redux'
class ChatPage extends React.Component{
    render(){
        if(this.props.user){
            return(
                <div className="ui container">
                    <ChatHistory/>
                    <ChatInput/>
                </div>
            )
        }else{
            return(
                <div className="ui container">
                    Log in first!
                </div>
            )
               
            
        }

    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(ChatPage);