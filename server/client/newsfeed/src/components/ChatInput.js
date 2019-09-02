import React from 'react'
import {Field, reduxForm} from 'redux-form'
import '../chatInput.css'
class ChatInput extends React.Component{
    renderInput(formProps){
        return(
            <div className="field ui form ">
                <textarea  {...formProps.input} placeholder="chat here"/>
            </div>
        ) 
    }
    render(){
        return(
            <div className="chatInput">
                <form className="ui form  container ">
                <Field  name="message" component={this.renderInput}/>
                </form>
            </div>
        )
    }
}
export default reduxForm({
    form:'ChatInput'
})(ChatInput);