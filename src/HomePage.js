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
		.catch((error) => {
			console.log(error);
		});
	}
	
	render() {
		const linkPosts = this.state.postData.map((item, i)=>{
			return(
				<Link to={'post/'+item.id}  key={i} >{item.title}</Link>
			);
		})
		
		return (
			
			<div className='wrapper' >
				<h1>HomePage</h1>
				{linkPosts}
				<h2><Link to={'create-post/'}>Create Post</Link></h2>
			</div>
		);
	}
}

export default HomePage;
