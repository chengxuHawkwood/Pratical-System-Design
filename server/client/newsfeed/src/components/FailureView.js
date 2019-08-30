import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
class FailuerView extends React.Component{
    renderError(){
        if(this.props.status===429)
            return "You can not post more than 2 times in 10 seconds"
        return this.props.status
    }
    render(){
        return(<div className="ui container">
                {this.renderError()}
                <Link className ="ui primary button" to="/" >Return HomePage</Link>
            </div>)
    }
}

const mapStateToProps=(state)=>{
    return{
        status:state.status
    }
}

export default connect(mapStateToProps)(FailuerView);