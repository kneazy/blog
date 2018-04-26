import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
class PostPage extends Component {
        constructor(props){
            super(props);
            this.state = {
              postData:[],
              userName:[],
              selectLink:'',
              commentsPost:[],
              intputComments:'',
              inputName:'',
              inputPostId:0,

                
            }
            this.handleChangeName = this.handleChangeName.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChangeComment = this.handleChangeComment.bind(this);
            
        }

    componentDidMount() {
        const {params} = this.props.match;    
        axios.get('http://localhost:4000/posts/'+params.id)
        .then((data) => {
            this.setState({
                postData: data.data
            })
        })
        .catch((error) => {
            console.log(error);
        });
        
        
        axios.get('http://localhost:4000/authors/' )
        .then((data) => {
            this.setState({
                userName: data.data
            })
        })
        .catch((error) => {
            console.log(error);
        });

        axios.get('http://localhost:4000/comments/' )
        .then((data) => {
            this.setState({
              commentsPost: data.data
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
    handleChangeName(e) {
      e.preventDefault();
      this.setState({
        inputName: e.target.value,
        inputPostId: this.state.postData.id
      })
      
    }

    handleChangeComment(e) {
        e.preventDefault();
        this.setState({
          inputComments: e.target.value
        })
    }

    handleSubmit(e) {
      axios.post('http://localhost:4000/comments/', {
              first_name: this.state.inputName,
              comment: this.state.inputComments,
              postId: this.state.inputPostId
      })
      .then((data) => {
          console.log(data.data);            
      })
      .catch((error) => {
          console.log(error);
      });
    }

    authorsInfo(){
        const id = this.state.postData.authorId;
        return (
            this.state.userName.map((item, i) => {
              if(id === item.id){
                return( 
                  <div key = {i} className='authors'>
                      <h4>Author:</h4><br/>
                      <h3><i>{item.first_name} {item.last_name}</i></h3><br/>
                      <i>{item.bio}</i>
                  </div>
                );
              }
              return null;
            })       
        );
    }

    shouComment(){
      const postId = this.state.postData.id;
      return (
          this.state.commentsPost.map((item, i)=>{
            if(postId === item.postId){
              return (
                <div key={i} className='commmets'>
                    <h3><i>{item.first_name} :</i></h3>
                    <p>{item.comment}</p>
                </div>
              );
            }
            return null;
          })
      );
    }

    render() {
        const comments = this.shouComment();
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
                <form onSubmit={this.handleSubmit }className="comment-form">
                    <label><b>Name:</b><br/>
                        <input type='text' size='53' onChange = {this.handleChangeName} />
                    </label>
                    <br/>
                    <label><b>Comment:</b><br/>
                        <textarea name='comment' cols='54' rows='3' onChange = {this.handleChangeComment}/>
                    </label>
                        <input type='submit'/>
                </form>
            </div>
        );
    }
}

export default withRouter(PostPage);
