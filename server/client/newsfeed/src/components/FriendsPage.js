import React from 'react';
import {connect} from 'react-redux'
import {fetchfriends} from '../actions'
class FriendsPage extends React.Component{
    componentDidMount(){
        this.props.fetchfriends()
    }
    sendMessage=()=>{

    }
    renderList(){
        
        return( 
            
            this.props.friends.map(friend=>{
                
                return(
                    <div className="ui item vertical segment" key={friend._id}>
                        <img className="ui avatar image" src={friend.photo}></img>
                        <div className="content">
                            <a className="header">{friend.name}</a>
                            <div>GoogleId:{friend.googleId}</div>
                        </div>
                        <button onClick={()=>{this.sendMessage(friend._id)}} className="ui primary button">message</button>
                    </div>)
            })

            )
    }
    render(){
        return  (
            <div className="ui container list">
                    {this.renderList()}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        friends: state.friends
    }
}

export default connect(mapStateToProps,{fetchfriends})(FriendsPage);