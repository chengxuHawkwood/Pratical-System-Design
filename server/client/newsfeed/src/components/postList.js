import React from 'react'
import {fetchOwnPosts, unfollow} from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import '../postList.css'
import {pageConf} from '../config/PageConfig'
class postList extends React.Component{
    componentDidMount(){
        this.props.fetchOwnPosts(0);
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
            return <button className="ui primary button unfollow" onClick={async ()=>{await this.props.unfollow(user_id); this.props.fetchOwnPosts(0);} }>Unfollow</button>
        }
    }

    loadNewer=()=>{
        this.props.fetchOwnPosts(this.props.offset-pageConf.pageSize);
    }

    loadOlder=()=>{
        this.props.fetchOwnPosts(this.props.offset+pageConf.pageSize);
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
    
    renderNewer=()=>{
        if(this.props.offset!==0){
            return(
                <button className="ui primary button updateButton" onClick={this.loadNewer}>More feeds</button>
            )
        }
    }
    renderOlder=()=>{
        if(this.props.posts.length===pageConf.pageSize){
            return(
                <button className="ui primary button updateButton" onClick={this.loadOlder}>More feeds</button>
            )
        }
    }
    render(){

        return(
            <div className="container">
                <div className="ui feed container">
                    {this.renderNewer()}
                    {this.renderList()}
                    {this.renderNewPostButton()}
                    {this.renderNewFriendButton()}
                    {this.renderOlder()}
                </div>
                
            </div>

        )
    }
}
const mapStateToMap=(state)=>{
    return {
        posts:Object.values(state.posts),
        user:state.user,
        offset:state.pageoffset
    }
}
export default connect(mapStateToMap,{fetchOwnPosts,unfollow})(postList)