import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
class PostPage extends Component {
        constructor(props){
            super(props);
            this.state = {
              postData:[],
              userName:[],
              selectLink:''
                
            }
          }

    componentDidMount() {
        const {params} = this.props.match
        axios.get('http://localhost:4000/posts/'+params.id)
        .then((data) => {
            this.setState({
                postData: data.data
            })
        })
        axios.get('http://localhost:4000/authors')
        .then((data) => {
            this.setState({
                userName: data.data
            })
        })
    }
    render() {
        
        return (
            <div>
                PostPage
                <div>{this.state.postData.body}</div>
            </div>
        );
    }
}

export default withRouter(PostPage);
