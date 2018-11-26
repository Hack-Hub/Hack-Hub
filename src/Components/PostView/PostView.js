import React, { Component } from 'react'
import './PostView.scss'
import Comments from './Comments/Comments'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

class PostView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {},
      followedSubHubs: [],
      userId: null,
      subscribeError: '',
    }

    this.handleNullUser = this.handleNullUser.bind(this)
    this.getUser = this.getUser.bind(this)
  }
  componentDidMount() {
    const { postId } = this.props.match.params
    axios.get('/api/getPostByID/' + postId).then(response => {
      this.setState({ post: response.data[0] })
    })
    this.getUser()
    // this.getSubhubCurrentUserFollows()
  }

  getUser() {
    axios.get('/api/currentUser').then(response => {
      if (!response.data.length) {
        return
      } else {
        this.setState({ userId: response.data[0].user_id })
        this.getSubhubCurrentUserFollows(this.state.userId)
      }
    })
  }

  getSubhubCurrentUserFollows() {
    axios.get(`/api/getUserSubs`).then(res => {
      this.setState({ followedSubHubs: res.data })
    })
  }

  handleSubscribe(subhubId) {
    console.log('hi')
    axios
      .post('/api/addFollow', {
        subhubId: subhubId,
        userId: this.state.userId,
      })
      .then(() => {
        this.getSubhubCurrentUserFollows()
      })
  }

  handleNullUser() {
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
    const follows =
      Object.values(this.state.followedSubHubs).findIndex(follow => {
        return follow.subhub_id === this.state.post.subhub_id
      }) !== -1

    console.log('follows', follows)
    console.log('this.state', this.state)

    const { sh_name, username, theme_color, sh_desc, subhub_id } = this.state.post
    return (
      <div>
        <div style={{ background: '#f5f5f5' }}>
          {this.state.subscribeError && <ErrorMessage message={this.state.subscribeError} />}
        </div>
        <div className="PostView--container">
          <section className="subhub-container">
            <div className="theme-color" style={{ background: theme_color }} />
            <div className="subhub-container-header">
              <img src="https://i.ytimg.com/vi/USAtCfAoMio/hqdefault.jpg" alt="subhub" />
              <Link to={`/subhub/${subhub_id}/postfeed`}>
                <h3>{sh_name}</h3>
              </Link>
            </div>
            <div className="subhub-body">
              <p className="desc-font">{sh_desc}</p>

              {follows ? (
                <button
                  className="subscribe-button primary-button"
                  onClick={async () =>
                    await axios
                      .delete(`/api/deleteFollow/${subhub_id}`)
                      .then(await this.getSubhubCurrentUserFollows(this.state.userId))
                  }
                >
                  Unsubscribe
                </button>
              ) : (
                <button
                  className="subscribe-button primary-button"
                  onClick={() => {
                    if (this.state.userId === null) {
                      this.handleNullUser()
                    } else {
                      this.handleSubscribe(subhub_id)
                    }
                  }}
                >
                  Subscribe
                </button>
              )}
            </div>
          </section>
          <section className="post-container">
            <div className="theme-color" style={{ background: theme_color }} />
            <div className="post-container-header">
              <img src="https://i.ytimg.com/vi/m380BLVOrkI/hqdefault.jpg" alt="user" />
              <h3>{username}</h3>
            </div>
          </section>
        </div>
        <div className="Comments--container">
          <section className="leftpadding-container" />
          <section className="comments">
            <Comments post={this.state.post} />
          </section>
        </div>
      </div>
    )
  }
}
export default PostView
