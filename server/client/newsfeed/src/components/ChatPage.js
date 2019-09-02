import React from 'react'
import ChatHistory from './ChatHistory'
import ChatInput from './ChatInput'

class ChatPage extends React.Component{
    render(){
        return(
            <div className="ui container">
                <ChatHistory/>
                <ChatInput/>
            </div>
        )
    }
}

export default ChatPage;