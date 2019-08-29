import React from 'react'
import {fetchOwnPosts, unfollow} from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import '../postList.css'
class postList extends React.Component{
    componentDidMount(){
        this.props.fetchOwnPosts();
    }
    renderNewPostButton(){
        if(this.props.user)
            return <div id="newPostIcon"><Link to="/posts/new"><i className="blue huge plus circle icon"></i></Link></div>
    }
    renderNewFriendButton(){
        if(this.props.user){
            return <div id="newFriendIcon"><Link to="/friends/new"><i className="red huge user plus icon"></i></Link></div>

        }
    }
    renderUnfollow(user_id){
        if(user_id!==this.props.user._id){

            return <button className="ui primary button unfollow" onClick={async ()=>{await this.props.unfollow(user_id); this.props.fetchOwnPosts();} }>Unfollow</button>
        }
    }

    renderList(){
        
        if(this.props.posts!=null){

            return this.props.posts.map((post)=>{
                return (
                    <div className="event item" key={post._id}>
                        <div className="label">
                           <img src={post._user.photo} /> 
                        </div>
                            <div className="content">
                            {this.renderUnfollow(post._user._id)}
                                <div className="summary">
                                    <a className="user">
                                    {post._user.name}
                                    </a> 
                                    {/* added you as a friend
                                    <div className="date">
                                    1 Hour Ago
                                    </div> */}
                                </div>
                                {/* <div className="meta">
                                    <a className="like">
                                    <i className="like icon"></i> 4 Likes
                                    </a>
                                </div> */}
                                
                                <div className="extra text">
                                    {post.message}
                                </div>
                                
                        </div>
                    </div>

                ) 
            })
        }
    }
   

    render(){

        return(
            <div className="container">
                <div className="ui feed container">
                    {this.renderList()}
                    {this.renderNewPostButton()}
                    {this.renderNewFriendButton()}
                </div>
                
            </div>

        )
    }
}
const mapStateToMap=(state)=>{
    return {
        posts:Object.values(state.posts),
        user:state.user
    }
}
export default connect(mapStateToMap,{fetchOwnPosts,unfollow})(postList)