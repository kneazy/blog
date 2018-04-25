import React, { Component } from 'react';
import axios from 'axios';

class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
          inputTitle:'',
          inputBody:'',
          inputAuthorsId:'',
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
            console.log(data.data)
            this.setState({
                userName: data.data
            })
        })
    }
    handleChange(e){
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            inputTitle: e.target.value
        })
    }

    handleChangeBody(e){
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            inputBody: e.target.value
        })
    }

    handleChangeAuthorsId(e){
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            inputAuthorsId: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        
        axios.post('http://localhost:4000/posts/', {
                title: this.state.inputTitle,
                body: this.state.inputBody,
                authorId: this.state.authorsId
            })
            .then((data) => {
                console.log(data.data);
             
            })
    }

    render() {
        const user = this.state.userName.map((item, i)=>{
                        return(  
                                <option  key={i}  value={item.id}>{item.first_name} {item.last_name}</option>    
                        );
                    })
        return (
            <div className='wrapper'>
                CreatePost
                <form onSubmit={this.handleSubmit}>
                    <label><b>Title:</b><br/>
                        <input type='text' size='40' onChange = {this.handleChange} />
                    </label>
                    <br/>
                    <label><b>Post:</b><br/>
                        <textarea name='comment' cols='41' rows='3' onChange = {this.handleChangeBody}/>
                    </label>
                    <br/>
                    <select onSelect = {this.handleChangeAuthorsId}>
                      {user}
                    </select>
                    <input type='submit' />
                </form>
            </div>
        );
    }
}

export default CreatePost;
