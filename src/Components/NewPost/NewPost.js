import React, { Component } from "react";
import './NewPost.scss'

class NewPost extends Component {
  constructor(){
    super()
    this.state={
      postType:'Text',
      title:'',
      text:null,
      URL:null,
      image:null
    }
  }
  handleInput=(event)=>{
    this.setState({[event.target.name]:event.target.value})
  }
  handleSubmit=()=>{

  }
  render() {
    const {postType} = this.state
    //conditionally render the post type depending on the selection
    let inputType=postType;
    if(postType==='Text'){inputType=<div><h5>Text</h5><input name = 'text' onChange={this.handleInput}/></div>}
    if(postType==='URL'){inputType=<div><h5>URL</h5><input name = 'URL' onChange={this.handleInput}/></div>}
    if(postType==='Image'){inputType=<div><h5>Image</h5><input name = 'image' onChange={this.handleInput}/></div>}
    
    return (
      <div className='newPost'>
        <h3>New Post</h3>
        <button onClick={()=>{this.setState({postType:'Text'})}}>Text</button>
        <button onClick={()=>{this.setState({postType:'URL'})}}>URL</button>
        <button onClick={()=>{this.setState({postType:'Image'})}}>Image</button>
        <h5>Title</h5>
        <input name='title' onChange={this.handleInput}/>
        {inputType}
        <button>Submit Post</button>
      </div>
    );
  }
}

export default NewPost;
