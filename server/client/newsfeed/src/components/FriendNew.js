import React from 'react'
import SearchBar from './SearchBar'
import FriendList from './FriendList'
class FriendNew extends React.Component{
    render(){
        return(
            <div className="ui container">
                <SearchBar/>
                <FriendList/>
            </div>
        )
    }
}

export default FriendNew;