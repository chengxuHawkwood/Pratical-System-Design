import React from 'react'
import ChatHistory from './ChatHistory'
import ChatInput from './ChatInput'
import {connect} from 'react-redux'
import io from 'socket.io-client';
class ChatPage extends React.Component{
    constructor(props){
        super(props);
        const socket = io.connect('http://localhost:80')
        this.state = {
           message: 'no message yet',
           socket: socket,
        };
    }
    componentDidMount(){
        this.state.socket.on('message recived', ({hello})=>{console.log('hello');console.log(this.state.socket.id)});
        this.state.socket.emit('new message', 1000);
    }
    render(){
        if(this.props.user){
            this.state.socket.emit('userInfo', this.props.user);
            return(
                <div className="ui container">
                    {this.state.message}
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