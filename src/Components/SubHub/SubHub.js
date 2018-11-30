import React, { Component } from 'react'
import './SubHub.scss'
import { Route, Switch, Link } from 'react-router-dom'
import Chat from '../Chat/Chat'
import PostFeed from '../PostFeed/PostFeed'
import axios from 'axios'
import SubHubSubscribe from './SubHubSubscribe';
import ErrorMessage from '../ErrorMessage/ErrorMessage'

class SubHub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subhubName: '',
      icon: '',
      banner: '',
      themeColor: this.props.theme_color,
      desc: '',
      posts: [],
      subscribeError: '',
      userId:null
    }

    this.getSubhubInfo = this.getSubhubInfo.bind(this)
  }

  componentDidMount() {
    this.getSubhubInfo()
    axios.get(`/api/getSubPosts/${this.props.match.params.id}`).then(res => {
      this.setState({ posts: res.data })
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      axios.get(`/api/getSubPosts/${this.props.match.params.id}`).then(res => {
        this.setState({ posts: res.data })
      })
    }
  }
  getSubhubInfo() {
    axios.get(`/api/getSub/${this.props.match.params.id}`).then(response => {
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
  handleNullUser=()=> {
    this.setState({
      subscribeError: 'Must be logged in to subscribe to a subhub',
    })
    setTimeout(
      function() {
        this.setState({
          subscribeError: '',
        })
      }.bind(this),
      3000
    )
  }
  render() {
    const { subhubName, icon, themeColor, desc } = this.state

    return (
      <div className="SubHub--container">
        <section className="banner" style={{ background: themeColor, marginTop: '-100px' }}>
          <div className="banner-container">
            <img src={icon} alt="subhub" />
            <div className="subhub-name">
              <h1>{subhubName}</h1>
              <p>{desc}</p>
            </div>
            <div
          style={{ background: '#f5f5f5', width: '80%', margin: '0 auto', paddingBottom: '0px' }}
        >
          {this.state.subscribeError && <ErrorMessage message={this.state.subscribeError} />}
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
          <section>
          <div className="links-container">
              <SubHubSubscribe className="subhub-links" subhub_id={this.props.match.params.id}  userId={this.state.userId} handleNullUser={this.handleNullUser}/>
              <Link to={'/newpost'}  className="subhub-links" id='post'>New Post</Link>
              </div>
          </section>
        </section>
        <Switch>
          <Route
            path="/subhub/:id/postfeed"
            render={props => <PostFeed {...props} posts={this.state.posts} />}
          />
          <Route path="/subhub/:id/chat" component={Chat} />
        </Switch>
      </div>
    )
  }
}

export default SubHub
