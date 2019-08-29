import React from 'react';
import {Router, Route, Switch} from 'react-router-dom'
import Header from './Header'
import history from '../history'
import postNew from './postNew'
import postList from './postList'
import FriendNew from './FriendNew'
class App extends React.Component{
  render(){
    return(
      
      <Router history={history}>
        <div>
            <Header/>
            <Switch>
                <Route path="/posts/new" exact component={postNew}/>
                <Route path="/" exact component={postList}/>
                <Route path="/friends/new" exact component={FriendNew}/>
            </Switch>
        </div>
      </Router>
    )

  }
}

export default App;
