import React, { Component } from 'react'
import axios from 'axios'
import ImageUpload from '../NewPost/ImageUpload'
// import './NewSubHub.scss';

class NewSubHub extends Component {
  constructor(){
    super()
    this.state={
      sh_name:'',
      sh_desc:'',
      sh_banner:null,
      sh_icon:null,
      theme_color:'#000000'
    }
  }
  //set state according to name of input
  handleInput=(event)=>{
    this.setState({[event.target.name]:event.target.value})
  }
  //axios post call
  handleSubmit=()=>{
    const { sh_name,sh_desc,sh_banner,sh_icon,theme_color} = this.state
    axios.post('/api/newSub',{sh_name, sh_desc, sh_icon, sh_banner, theme_color})
    .then(()=>{
      this.setState({sh_name:'',sh_desc:'',sh_banner:null,sh_icon:null,theme_color:'#000000'})
    })
    .catch((error)=>{
      alert(error)
    })
  }

  setBannerURL=(URL)=>{
    console.log(URL);
    this.setState({sh_banner:URL})
  }
  
  setIcon=(URL)=>{
    console.log(URL);
    this.setState({sh_icon:URL})
  }

  render() {
 
    return (
      <div className='newPost'>
        <h1>New SubHub</h1>
        <h5>SubHub Name</h5>
        <input name='sh_name' onChange={this.handleInput} value={this.state.sh_name}/>
        <h5>SubHub Description</h5>
        <input name='sh_desc' onChange={this.handleInput} value={this.state.sh_desc}/>
        <h5>Theme Color</h5>
        <input name='theme_color' onChange={this.handleInput} value={this.state.themeColor}/>
        <h5>SubHub Icon</h5>
        <ImageUpload setImageURL={this.setIcon}/>
        <h5>Banner Image</h5>
        <ImageUpload setImageURL={this.setBannerURL}/>
        <button onClick={this.handleSubmit}>Submit SubHub</button>
      </div>
    );
  }
}
export default NewSubHub
