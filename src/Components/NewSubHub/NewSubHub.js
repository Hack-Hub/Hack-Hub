import React, { Component } from 'react'
import axios from 'axios'
import BannerLibrary from '../BannerAndIconLibrary/BannerLibrary'
import IconLibrary from '../BannerAndIconLibrary/IconLibrary'
import './NewSubHub.scss'

class NewSubHub extends Component {
  constructor() {
    super()
    this.state = {
      sh_name: '',
      sh_desc: '',
      sh_icon: '',
      sh_banner: '',
      theme_color: '',
    }

    this.setColor = this.setColor.bind(this)
    this.setIcon = this.setIcon.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setColor(color) {
    this.setState({ theme_color: color, sh_banner: color })
  }

  //set state according to name of input
  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  setIcon = URL => {
    // console.log('URL', URL)
    this.setState({ sh_icon: URL })
  }
  //axios post call
  handleSubmit = () => {
    const { sh_name, sh_desc, sh_icon, sh_banner, theme_color } = this.state
    axios
      .post('/api/newSub', { sh_name, sh_desc, sh_icon, sh_banner, theme_color })
      .then(() => {
        this.setState({
          sh_name: '',
          sh_desc: '',
          sh_icon: this.state.icon,
          sh_banner: this.state.sh_banner,
          theme_color: this.state.theme_color,
        })
      })
      .catch(error => {
        alert(error)
      })
  }

  render() {
    return (
      <div className="NewSubHub--Container">
        <h3>New SubHub</h3>
        <div className="ruler" />
        <section className="newhub-input">
          <h5>SubHub Name</h5>
          <input name="sh_name" onChange={this.handleInput} value={this.state.sh_name} />
          <h5>SubHub Description</h5>
          <input name="sh_desc" onChange={this.handleInput} value={this.state.sh_desc} />
          <h5>Theme Color</h5>
          {/* <input name="theme_color" onChange={this.handleInput} value={this.state.themeColor} /> */}
          <BannerLibrary setColor={this.setColor} />
          <h5>SubHub Icon</h5>

          {/* <ImageUpload setImageURL={this.setIcon} /> */}
          <IconLibrary setIcon={this.setIcon} />
        </section>

        <button className="submit-subhub" onClick={this.handleSubmit}>
          Submit SubHub
        </button>
      </div>
    )
  }
}
export default NewSubHub
