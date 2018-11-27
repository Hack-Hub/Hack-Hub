import React, { Component } from 'react'
import './PostView.scss'
import Comments from './Comments/Comments'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { withRouter } from 'react-router-dom'
import SubHubSubscribe from '../SubHub/SubHubSubscribe';

class PostView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {},
      userId: null,
      subscribeError: '',
    }

    this.getUser = this.getUser.bind(this)
    // this.handleRoute = this.handleRoute.bind(this)
  }
  componentDidMount() {
    const { postId } = this.props.match.params
    axios.get('/api/getPostByID/' + postId).then(response => {
      this.setState({ post: response.data[0] })
    })
    this.getUser()
  }

  getUser() {
    axios.get('/api/currentUser').then(response => {
      if (!response.data.length) {
        return
      } else {
        this.setState({ userId: response.data[0].user_id })
      }
    })
  }

  render() {
 
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
              <SubHubSubscribe subhub_id={subhub_id}/>
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
