import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
class PostPage extends Component {
        constructor(props){
            super(props);
            this.state = {
              postData:[],
              userName:{},
              selectLink:''
                
            }
          }

    componentDidMount() {
        const {params} = this.props.match;    
        axios.get('http://localhost:4000/posts/'+params.id)
        .then((data) => {
            console.log(data);
            this.setState({
                postData: data.data
            })
        })
        
        
        axios.get('http://localhost:4000/authors/' )
        .then((data) => {
            const id = this.state.postData.authorId
            this.setState({
                userName: data.data[id-1]
            })
        })
    }
    authorsInfo(){
        const id = this.state.postData.authorId
        const authors = this.state.userName[id-1];
        console.log(authors);
        return 
         
        
    }
    render() {
        //const authorsInfo = this.authorsInfo();
        console.log(this.state.userName);
        return (
            <div className="wrapper">
                PostPage
                <div>{this.state.postData.body}</div>
                <div>{}</div>
            </div>
        );
    }
}

export default withRouter(PostPage);
