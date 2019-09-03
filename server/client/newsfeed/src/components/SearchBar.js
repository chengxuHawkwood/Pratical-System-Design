import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {fetchFollows} from '../actions'
import {connect} from 'react-redux'
import '../css/SearchBar.css'
class SearchBar extends React.Component{



    onSubmit=(formValues)=>{
        this.props.fetchFollows(formValues);
    }

    renderInput(formProps){
        return(
            <div className="ui icon input">
                <input className="searchInput prompt" {...formProps.input} placeholder="input the person's googleId you want to follow"/>
                <i className="search icon"></i>
            </div>
            
        )
    }
    render(){
        return <form className="ui search "  onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="Followee" component={this.renderInput}/>
                </form>;
    }

}
export default connect(null, {fetchFollows})(reduxForm({
    form:'newFriend',
})(SearchBar));