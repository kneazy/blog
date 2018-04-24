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
              //console.log(data.data);
              this.setState({
                postData: data.data
              })
            })
          }
    
    render() {
        // console.log(this.state.selectLink);
         const linkPosts = this.state.postData.map((item, i)=>{
            return(
                <Link to={'post/'+item.id}  key={i} >{item.title}</Link>
            );
         })
        // console.log(this.props.match);
        
        return (
            
            <div className="wrapper" >
                HomePage
                {linkPosts }
            </div>
        );
    }
}

export default HomePage;
