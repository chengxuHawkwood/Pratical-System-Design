import React from 'react'
import {connect} from 'react-redux'
import {fetchFollows, follow, unfollow} from '../actions'
class FriendList extends React.Component{
    componentDidMount(){
        this.props.fetchFollows();
    }
    follow(follow_id){
        this.props.follow(follow_id);
    }
    unfollow(follow_id){
        this.props.unfollow(follow_id);
    }
    renderList(){
        
        return this.props.tofollwers.map((follower)=>{
            
            if(follower!==-1&&follower._id===this.props.user._id){
                return null;
            }
            if(follower!==-1&&this.props.followers.includes(follower._id)){
               return( 
               <div className="item" key={follower._id}>
                    <img className="ui avatar image" src={follower.photo}></img>
                    <div className="content">
                        <a className="header">{follower.name}</a>
                        <div>GoogleId:{follower.googleId}</div>
                    </div>
                    <button onClick={()=>{this.unfollow(follower._id)}} className="ui primary button">unfollow</button>
                </div>
               )
            }else{
                return(
                    <div className="item" key={follower._id}>
                        <img className="ui avatar image" src={follower.photo}></img>
                        <div className="content">
                            <a className="header">{follower.name}</a>
                            <div>GoogleId:{follower.googleId}</div>
                        </div>
                        <button onClick={()=>{this.follow(follower._id)}} className="ui primary button">follow</button>
                    </div>
                )
            }

        })
    }
    render(){

        if(this.props.tofollwers.length===0){
            return(
                <h1>No such User</h1>
            )
        }
        return(
            <div className="ui list">
                {this.renderList()}
            </div>
        )
    }

}

const mapStateToProps=(state)=>{
    return{
        tofollwers:Object.values(state.tofollowers),
        followers:Object.values(state.followers).map((x)=>(x.to)),
        user: state.user
    }
    
}
export default connect(mapStateToProps,{fetchFollows, follow, unfollow})(FriendList);