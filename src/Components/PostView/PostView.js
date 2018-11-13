import React, { Component } from 'react'
import './PostView.scss'

class PostView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="PostView--container">
        <section className="subhub-container">
          <div className="theme-color" />
          <div className="subhub-container-header">
            <img src="https://i.ytimg.com/vi/USAtCfAoMio/hqdefault.jpg" alt="subhub" />
            <h3>subhub name</h3>
          </div>
        </section>
        <section className="post-container">
          <div className="theme-color" />
          <div className="post-container-header">
            <img src="https://i.ytimg.com/vi/m380BLVOrkI/hqdefault.jpg" alt="user" />
            <h3>Username Here</h3>
          </div>
        </section>
      </div>
    )
  }
}
export default PostView
