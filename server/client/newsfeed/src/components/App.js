import React from 'react';
import {Router, Route, Switch} from 'react-router-dom'
import Header from './Header'
import history from '../history'
import postNew from './postNew'
import postList from './postList'
class App extends React.Component{
  render(){
    return(
      
      <Router history={history}>
        <div>
            <Header/>
            <Switch>
                <Route path="/posts/new" exact component={postNew}/>
                <Route path="/" exact component={postList}/>
            </Switch>
        </div>
      </Router>
    )

  }
}

export default App;
