import React, { Component } from "react";
import './NewPost.scss'
import ImageUpload from './ImageUpload'
import GetSubHub from './GetSubHub'
import axios from 'axios'
// import {newPost} from '../../Ducks/PostsReducer'

class NewPost extends Component {
  constructor(){
    super()
    this.state={
      postType:'Text',
      title:'',
      text:null,
      URL:null,
      imageURL:null,
      subhub_id:0
    }
  }
  handleInput=(event)=>{
    //set state according to name of input
    this.setState({[event.target.name]:event.target.value})
  }
  handleTypeChange=(event)=>{
    //change post type and null all values
    this.setState({postType:event.target.name,title:null,text:null,URL:null,image:null})
  }
  handleSubmit=()=>{
    //axios/redux call
    const { title, text, URL,imageURL,subhub_id} = this.state
    // newPost(title,text,URL,image,subhub_id)
    axios.post('/api/newPost',{subhub_id,title,text_content:text,URL,image_url:imageURL,})
  }
  setSubHubID=(id)=>{
    this.setState({subhub_id:id})
  }
  setImageURL=(URL)=>{
    console.log(URL);
    this.setState({imageURL:URL})
  }
  render() {
    const {postType} = this.state
    //conditionally render the post type depending on the button selection
    let inputType=postType;
    if(postType==='Text'){inputType=<div><h5>Text</h5><input name = 'text' onChange={this.handleInput}/></div>}
    if(postType==='URL'){inputType=<div><h5>URL</h5><input name = 'URL' onChange={this.handleInput}/></div>}
    if(postType==='Image'){inputType = <div><h5>Image</h5><ImageUpload setImageURL={this.setImageURL}/></div>}
    
    return (
      <div className='newPost'>
        <GetSubHub setID={this.setSubHubID}/>
        <h3>New Post</h3>
        <button name='Text' onClick={this.handleTypeChange}>Text</button>
        <button name='URL' onClick={this.handleTypeChange}>URL</button>
        <button name='Image' onClick={this.handleTypeChange}>Image</button>
        <h5>Title</h5>
        <input name='title' onChange={this.handleInput}/>
        {inputType}
        <button onClick={this.handleSubmit}>Submit Post</button>
      </div>
    );
  }
}

export default NewPost;
