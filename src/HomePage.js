import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './App.css';

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
		.catch((error) => {
			console.log(error);
		});
	}
	
	render() {
		const postsLink = this.state.postData.map((item, i)=>{
			return(
				<Link to={'post/'+item.id}  key={i} >{item.title}</Link>
			);
		})
		
		return (
			
			<div className='wrapper' >
        <img alt='img' src='https://i.imgur.com/ha23tw2.jpg' />
				<h1>HomePage</h1>
				{postsLink}
				<h2><Link to={'create-post/'}>Create Post</Link></h2>
			</div>
		);
	}
}

export default HomePage;
