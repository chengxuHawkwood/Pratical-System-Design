import React from 'react';
import {Router, Route} from 'react-router-dom'
import Header from './Header'
import history from '../history'
class App extends React.Component{
  render(){
    return(
      <Router history={history}>
        <Header/>
      </Router>
    )

  }
}

export default App;
