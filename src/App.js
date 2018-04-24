import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PostPage from './PostPage';

class App extends Component {
 
  
  render() {
      
    return (
      <Router>
        <div>
          <Route exact path ='/' component={HomePage}/>
          <Route exact path='/post/:id' component={PostPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
