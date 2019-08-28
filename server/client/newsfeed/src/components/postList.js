import React from 'react'
import {fetchOwnPosts} from '../actions'
import {connect} from 'react-redux'
class postList extends React.Component{
    componentDidMount(){
        this.props.fetchOwnPosts();
    }
    renderList(){
        if(this.props.posts!=null){
            console.log(this.props.posts)
            return this.props.posts.map((post)=>{
                return (
                    <div class="event" key={post._id}>
                        <div class="label">
                           {/*  <img src="/images/avatar/small/elliot.jpg"/> */}
                        </div>
                    <div class="content">
                        <div class="summary">
                            <a class="user">
                            Elliot Fu
                            </a> added you as a friend
                            <div class="date">
                            1 Hour Ago
                            </div>
                        </div>
                        <div class="meta">
                            <a class="like">
                            <i class="like icon"></i> 4 Likes
                            </a>
                        </div>
                        <div class="extra text">
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
            <div className="ui feed container">{this.renderList()}</div>
        )
    }
}
const mapStateToMap=(state)=>{
    return {
        posts:Object.values(state.posts)
    }
}
export default connect(mapStateToMap,{fetchOwnPosts})(postList)