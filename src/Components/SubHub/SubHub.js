import React, { Component } from 'react'
import './SubHub.scss'
import { Route, Switch, Link } from 'react-router-dom'
import Chat from '../Chat/Chat'
import PostFeed from '../PostFeed/PostFeed'
import axios from 'axios'

class SubHub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subhubName: '',
      icon: '',
      banner: '',
      themeColor: '',
      desc: '',
    }

    this.getSubhubInfo = this.getSubhubInfo.bind(this)
    // this.getSubhubPosts = this.getSubhubPosts.bind(this)
  }

  componentDidMount() {
    this.getSubhubInfo()
    // this.getSubhubPosts()
  }

  getSubhubInfo() {
    axios.get(`/api/getSub/${this.props.match.params.id}`).then(response => {
      // console.log('response', response)
      // response.data[0]
      const { sh_name, sh_icon, sh_banner, theme_color, sh_desc } = response.data[0]
      this.setState({
        subhubName: sh_name,
        icon: sh_icon,
        banner: sh_banner,
        themeColor: theme_color,
        desc: sh_desc,
      })
    })
  }

  // getSubhubPosts() {
  //   axios.get(`/api/getSubPosts/${this.props.match.params.id}`).then(response => {
  //     console.log('response', response)
  //   })
  // }

  render() {
    const { subhubName, icon, banner, themeColor, desc } = this.state
    return (
      <div className="SubHub--container">
        <section className="banner" style={{ background: themeColor }}>
          <div className="banner-container">
            <img src={icon} alt="subhub" />
            <div className="subhub-name">
              <h1>{subhubName}</h1>
              <p>{desc}</p>
            </div>
          </div>
        </section>
        <section className="links">
          <div className="links-container">
            <Link to={`/subhub/${this.props.match.params.id}/postfeed`} className="subhub-links">
              Posts
            </Link>
            <Link
              to={`/subhub/${this.props.match.params.id}/chat`}
              className="subhub-links"
              subhub_name={this.state.subhubName}
            >
              Chat
            </Link>
          </div>
        </section>
        <Switch>
          {/* TODO!! CHANGE THIS FIRST ROUTE TO A RENDER ROUTE FOR SUB HUB ID */}
          <Route path="/subhub/:id/postfeed" component={PostFeed} />
          <Route path="/subhub/:id/chat" component={Chat} />
        </Switch>
      </div>
    )
  }
}

export default SubHub
