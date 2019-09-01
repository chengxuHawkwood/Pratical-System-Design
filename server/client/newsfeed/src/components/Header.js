import React from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../actions'
import {Link} from 'react-router-dom'
class Header extends React.Component{

    componentDidMount(){
        this.props.fetchUser()
    }

    renderAuth(){
        if(this.props.user==null||this.props.user===false){
            return <a href ="/auth/google" className="item">Log In with Google</a>
        }else{
            return <a href ="/api/logout" className="item">Log Out</a>
        }
    }
    renderFriendList(){
        if(this.props.user==null||this.props.user===false){
            return null;
        }else{
            return <Link to = '/friends' className="item">My Friends</Link>
        }
        
    }
    render(){
        return (
            <div className="ui container red inverted menu">
                    {this.renderFriendList()}
                <div className="right menu">
                    {this.renderAuth()}
                </div>
            </div>
        )

    }
}

const mapStateToProps=(state)=>{
    return {
        user:state.user
    }
}

export default connect(mapStateToProps, {fetchUser})(Header); 