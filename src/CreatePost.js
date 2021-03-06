import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CreatePost extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputTitle:'',
      inputBody:'',
      inputAuthorsId: 1,
      userName:[],
        
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeBody = this.handleChangeBody.bind(this);
    this.handleChangeAuthorsId = this.handleChangeAuthorsId.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/authors/' )
    .then((data) => {
        this.setState({
            userName: data.data
        })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleChange(e) {
    this.setState({
        inputTitle: e.target.value
    })
  }

  handleChangeBody(e) {
    this.setState({
        inputBody: e.target.value
    })
  }

  handleChangeAuthorsId(e) {
    this.setState({
        inputAuthorsId: parseInt(e.target.value, 10)
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    
    axios.post('http://localhost:4000/posts/', {
            title: this.state.inputTitle,
            body: this.state.inputBody,
            authorId: this.state.inputAuthorsId
    })
    .then((response) => {
      console.log(response.data);            
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
      const user = this.state.userName.map((item, i)=>{
        return(  
            <option key={i} value={item.id}>{item.first_name} {item.last_name}</option>                       
        );
      })
    return (
      <div className='wrapper'>
        <h1>CreatePost</h1>
        <form onSubmit={this.handleSubmit}>
          <label><b>Title:</b><br/>
            <input type='text' size='40' onChange = {this.handleChange} />
          </label>
          <br/>
          <label><b>Post:</b><br/>
            <textarea name='comment' cols='41' rows='3' onChange = {this.handleChangeBody}/>
          </label>
          <br/>
          <b>Select Author:</b>
          <select value={this.state.inputAuthorsId} onChange = {this.handleChangeAuthorsId}>
            {user}
          </select>
          <input type='submit' />
        </form>
        <h4><Link to='/'>Back Home</Link></h4>
      </div>
    );
  }
}

export default CreatePost;
