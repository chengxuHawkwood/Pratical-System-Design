import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {send_message} from '../actions'
import '../css/chatInput.css'

class ChatInput extends React.Component{

    renderInput(formProps){
        return(
            <div className="field ui form ">
                <textarea className="sendContent" {...formProps.input} placeholder="chat here"/>
            </div>
        ) 
    }
    onSubmit=async (formProps)=>{
        await this.props.send_message(formProps.message, this.props.thread.thread);
        this.props.socket.emit('new message', this.props.thread.thread);
    }
    render(){
        return(
            <div className="chatInput">
                <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field  name="message" component={this.renderInput}/>
                <button className="ui primary button ">send</button>
                </form>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        thread:state.userthread
    }
}
export default connect(mapStateToProps, {send_message})(reduxForm({
    form:'ChatInput'
})(ChatInput));