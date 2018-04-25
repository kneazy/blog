import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class HomePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            postData:[],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/posts')
        .then((data) => {
            this.setState({
                postData: data.data
            })
        })
    }
    
    render() {
        const linkPosts = this.state.postData.map((item, i)=>{
            return(
                <Link to={'post/'+item.id}  key={i} >{item.title}</Link>
            );
        })
        
        return (
            
            <div className='wrapper' >
                HomePage
                {linkPosts}
                <Link to={'create-post/'}>Create Post</Link>
            </div>
        );
    }
}

export default HomePage;
