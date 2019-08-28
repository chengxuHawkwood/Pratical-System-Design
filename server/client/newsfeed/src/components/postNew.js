import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {createPost} from '../actions';
import {connect} from 'react-redux'
import '../postNew.css'
class postNew extends React.Component{
    onSubmit=(formValues)=>{
        this.props.createPost(formValues)
        
    }

    renderInput=(formProps)=>{
        return(
            <div className="field ui form ">
                <textarea  {...formProps.input} placeholder="tweet here"/>
                {/* <div>{this.renderError(formProps.meta)}</div> */}
            </div>
        ) 
    }
    render(){
        return <form className="ui form error container" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="tweet" component={this.renderInput} label="tweet here"/>
                    <button className="ui primary button">tweet</button>
                </form>;
    }
}

export default connect(null, {createPost})(reduxForm({
    form: 'postNew',
})(postNew));