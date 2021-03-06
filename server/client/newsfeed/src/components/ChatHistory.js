import React from 'react'
import '../css/chatHistory.css'
import {connect} from 'react-redux'
import {fetch_messages} from '../actions'
import '../css/chatHistory.css'
class ChatHistory extends React.Component{
    constructor(props){
        super(props);
        this.fetch = null;
    }
    componentDidMount(){
        this.props.fetch_messages(this.props.thread.thread, 0)
        this.props.socket.on('updateNow', async()=>{
            this.props.fetch_messages(this.props.thread.thread, 0);
        })
      //  this.fetch = setInterval(()=>{this.props.fetch_messages(this.props.thread.thread, 0)},3000)
    }
    componentWillUnmount(){
        if(this.fetch) clearInterval(this.fetch);
    }
    renderList(){
        return this.props.messages.map((message)=>{
            if(message.user._id===this.props.user._id){
                return (
                    <div className="ui segment item loguser  message" key={message._id}>
                        <div className="ui mecontent">
                            {message.content}
                        </div>
                    </div>
                    )
            }else{
                return(
                    <div className="ui segment item others  message " key={message._id}>
                        <div className="ui mecontent">
                            {message.content}
                        </div>
                    </div>
                )
            }
        })

    }
    render(){
        return (
            <div className='history ui container'>
                {this.renderList()}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        messages:state.chatMessages,
        user:state.user,
        thread:state.userthread
    }
}
export  default connect(mapStateToProps,{fetch_messages})(ChatHistory);