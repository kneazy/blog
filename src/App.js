import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PostPage from './PostPage';
import CreatePost from './CreatePost';

class App extends Component {
 
  
  render() {
      
    return (
      <Router>
        <div>
          <Route exact path ='/' component={HomePage}/>
          <Route exact path='/post/:id' component={PostPage}/>
          <Route exact path='/create-post' component={CreatePost}/>
        </div>
      </Router>
    );
  }
}

export default App;
