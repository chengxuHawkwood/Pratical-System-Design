import React from 'react'
import ChatHistory from './ChatHistory'
import ChatInput from './ChatInput'
import {connect} from 'react-redux'
import io from 'socket.io-client';
import '../css/chatPage.css'
class ChatPage extends React.Component{
    constructor(props){
        super(props);
        const socket = io.connect('http://localhost:80')
        this.state = {
           message: 'no message yet',
           socket: socket,
        };
    }
    componentWillUnmount(){
        this.state.socket.emit('logout', this.props.user);
    }
    render(){
        if(this.props.user){
            this.state.socket.emit('userInfo', this.props.user);
            return(
                <div className="chatpage">
                    <ChatHistory socket={this.state.socket}/>
                    <ChatInput socket={this.state.socket}/>
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