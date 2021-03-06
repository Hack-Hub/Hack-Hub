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
      userId: null,
    }
  }

  componentDidMount() {
    axios.get('/api/currentUser').then(async response => {
      // console.log('response', response)
      if (!response.data.length) {
        return
      } else {
        await this.setState({ userId: response.data[0].user_id })
      }
    })
  }

  setColor=(color)=> {
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
      .then((response) => {
        this.setState({
          sh_name: '',
          sh_desc: '',
          sh_icon: this.state.icon,
          sh_banner: this.state.sh_banner,
          theme_color: this.state.theme_color,
        })
        this.props.history.push(`subhub/${response.data[0].subhub_id}/postfeed`)
      })
      .catch(error => {
        alert("Subhub name already exists")
      })
  }

  render() {
    return (
      <div className="NewSubHub--Container">
        {this.state.userId === null && (
          <div style={{ margin: '30px auto' }}>
            <h1>You must be signed in to create a new subhub.</h1>
          </div>
        )}
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
