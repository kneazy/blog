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
        const {params} = this.props.match;    
        axios.get('http://localhost:4000/posts/'+params.id)
        .then((data) => {
            console.log(data.data);
            this.setState({
                postData: data.data
            })
        })
        
        
        axios.get('http://localhost:4000/authors/' )
        .then((data) => {
             console.log(data.data)
            this.setState({
                userName: data.data
            })
        })
    }
    authorsInfo(){
        const id = this.state.postData.authorId
        return (
            this.state.userName.map((item, i) => {
                if(id === item.id){
                    return( 
                        <div key = {i}>
                            <i>{item.first_name} {item.last_name}</i><br/>
                            <i>{item.bio}</i>
                        </div>
                    );
                }
                return null;
            })
        
        );
    }
    render() {
        const user = this.authorsInfo();
        return (
            <div className="wrapper">
                <h1>PostPage</h1>
                <div>{this.state.postData.body}</div>
                <div>
                    <h3>Author:</h3>
                    <div>{user}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(PostPage);
