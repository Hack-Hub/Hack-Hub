import React, { Component } from 'react'
import axios from 'axios'
// import ImageUpload from '../NewPost/ImageUpload'
import BannerLibrary from '../BannerAndIconLibrary.js/BannerLibrary'
import IconLibrary from '../BannerAndIconLibrary.js/IconLibrary'
// import './NewSubHub.scss';

class NewSubHub extends Component {
  constructor() {
    super()
    this.state = {
      sh_name: '',
      sh_desc: '',
      sh_banner: null,
      sh_icon: null,
      theme_color: '',
    }

    this.setColor = this.setColor.bind(this)
  }

  setColor(color) {
    this.setState({ theme_color: color })
  }

  //set state according to name of input
  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  //axios post call
  handleSubmit = () => {
    const { sh_name, sh_desc, sh_banner, sh_icon, theme_color } = this.state
    axios
      .post('/api/newSub', { sh_name, sh_desc, sh_icon, sh_banner, theme_color })
      .then(() => {
        this.setState({
          sh_name: '',
          sh_desc: '',
          sh_banner: null,
          sh_icon: null,
          theme_color: this.state.theme_color,
        })
      })
      .catch(error => {
        alert(error)
      })
  }

  // setBannerURL = URL => {
  //   console.log(URL)
  //   this.setState({ sh_banner: URL })
  // }

  setBannerColor = theme_color => {
    console.log(theme_color)
    this.setState({ sh_banner: theme_color })
  }

  setIcon = URL => {
    console.log(URL)
    this.setState({ sh_icon: URL })
  }

  render() {
    console.log('this.state', this.state)
    return (
      <div className="newPost">
        <h1>New SubHub</h1>
        <h5>SubHub Name</h5>
        <input name="sh_name" onChange={this.handleInput} value={this.state.sh_name} />
        <h5>SubHub Description</h5>
        <input name="sh_desc" onChange={this.handleInput} value={this.state.sh_desc} />
        <h5>Theme Color</h5>
        {/* <input name="theme_color" onChange={this.handleInput} value={this.state.themeColor} /> */}
        <BannerLibrary setColor={this.setColor} />
        <h5>SubHub Icon</h5>
        {/* <ImageUpload setImageURL={this.setIcon} /> */}
        <IconLibrary />
        {/* <h5>Banner Image</h5>
        <ImageUpload setImageURL={this.setBannerURL} /> */}
        <button onClick={this.handleSubmit}>Submit SubHub</button>
      </div>
    )
  }
}
export default NewSubHub
