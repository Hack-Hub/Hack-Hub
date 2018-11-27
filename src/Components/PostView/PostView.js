import React, { Component } from 'react'
import './PostView.scss'
import Comments from './Comments/Comments'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { withRouter } from 'react-router-dom'

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
    // this.handleRoute = this.handleRoute.bind(this)
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

  // handleRoute(web_url) {
  //   const path = web_url
  //   this.props.history.push(path)
  // }

  render() {
    const follows =
      Object.values(this.state.followedSubHubs).findIndex(follow => {
        return follow.subhub_id === this.state.post.subhub_id
      }) !== -1

    console.log('follows', follows)
    console.log('this.state', this.state)

    const {
      sh_name,
      username,
      theme_color,
      sh_desc,
      subhub_id,
      post_date_time,
      image_url,
      user_id,
      title,
      web_url,
    } = this.state.post

    const date = new Date(post_date_time)

    const time = date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    })

    const hasImage = image_url !== null
    const hasURL = web_url !== null

    return (
      <div>
        <div
          style={{ background: '#f5f5f5', width: '80%', margin: '0 auto', paddingBottom: '0px' }}
        >
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
                  // style={{ background: this.state.post.theme_color }}

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
              <div className="left">
                <img src="https://i.ytimg.com/vi/m380BLVOrkI/hqdefault.jpg" alt="user" />
                <Link to={`/user/${user_id}`}>
                  <h3>{username}</h3>
                </Link>
              </div>
              <div className="right">
                <p className="desc-font" style={{ textTransform: 'uppercase' }}>
                  {time} <span>| </span>
                  {date.toDateString()}
                </p>
              </div>
            </div>
            <div className="post-container-body">
              <h3 className="subtitle" style={{ marginLeft: '0px' }}>
                {title}
              </h3>
              {hasImage && <img src={image_url} alt="post" />}
              {hasURL && (
                <a className="desc-font" href={web_url} target="_blank" rel="noopener noreferrer">
                  {web_url}
                </a>
              )}
            </div>
            {/* <div className="ruler" /> */}
            <div className="Comments--container">
              <Comments post={this.state.post} />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default withRouter(PostView)
