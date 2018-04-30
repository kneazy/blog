import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

import './App.css';

class PostPage extends Component {
        constructor(props){
          super(props);
          this.state = {
            postData:{},
            userName:[],
            commentsPost:[],
            intputComments:'',
            inputName:'',
            inputPostId:0,    
          }
          this.handleChangeName = this.handleChangeName.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChangeComment = this.handleChangeComment.bind(this);    
        }
  fetchAuthors(authorId){
    axios.get('http://localhost:4000/authors/'+authorId)
        .then((response) => {
          console.log(response.data);
          this.setState({
            userName: response.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
  }
  fetchCommens(postId){
    axios.get('http://localhost:4000/posts/' + postId + '/comments/')
        .then((response) => {
          this.setState({
            commentsPost: response.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
  }
  componentDidMount() {
    const {params} = this.props.match;
    axios.get('http://localhost:4000/posts/' + params.id)
    .then((response) => {
        this.setState({
          postData: response.data,
        })

      this.fetchAuthors(response.data.authorId)
      this.fetchCommens(response.data.id)
    })
    .catch((error) => {
        console.log(error);
    });
  }

  handleChangeName(e) {
    this.setState({
      inputName: e.target.value,
      inputPostId: this.state.postData.id
    })  
  }

  handleChangeComment(e) {
    this.setState({
      inputComments: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:4000/posts/' + this.state.inputPostId.id + '/comments/', {
      first_name: this.state.inputName,
      comment: this.state.inputComments,
      postId: this.state.inputPostId.id
    })
    .then((response) => {
      this.setState({
        commentsPost: this.state.commentsPost.concat(response.data)
      })        
    })
    .catch((error) => {
      console.log(error);
    });
  }

  authorsInfo(){
    return (
      <div  className='authors'>
          <h4>Author:</h4><br/>
          <h3><i>{this.state.userName.first_name} {this.state.userName.last_name}</i></h3><br/>
          <i>{this.state.userName.bio}</i>
      </div>
    );
  }

  showComment(){
    return (
      this.state.commentsPost.map((item, i) => {
        return (
          <div key={i} className='commmets'>
              <h3><i>{item.first_name} :</i></h3>
              <p>{item.comment}</p>
          </div>
        );
      })
    );
  }

  render() {
    const comments = this.showComment();
    const user = this.authorsInfo();
    return (
        <div className="wrapper">
            <h1>PostPage</h1>
            <div>{this.state.postData.body}</div>
            <div>
                <h4><Link to='/'>Back Home</Link></h4>
                <div>{user}</div>
            </div>
            <div>{comments}</div>
            <form onSubmit={this.handleSubmit}className="comment-form">
                <label>
                  <b>Name:</b><br/>
                  <input type='text' size='53' onChange = {this.handleChangeName} />
                </label>
                <br/>
                <label>
                  <b>Comment:</b><br/>
                  <textarea name='comment' cols='54' rows='3' onChange = {this.handleChangeComment}/>
                </label>
                <input type='submit'/>
            </form>
        </div>
    );
  }
}

export default withRouter(PostPage);
