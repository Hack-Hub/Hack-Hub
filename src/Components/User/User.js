import React, { Component } from 'react'
import axios from 'axios'
import PostCard from '../PostCard/PostCard'
import { Link } from 'react-router-dom'
import './User.scss'

class User extends Component {
  constructor() {
    super()

    this.state = {
      current_user: {},
      followed_subs: [],
      posts: [],
    }

    this.getSubhubCurrentUserFollows = this.getSubhubCurrentUserFollows.bind(this)
  }

  componentDidMount() {
    axios.get('/api/currentUser').then(res => {
      this.setState({ current_user: res.data[0] })
    })

    this.getSubhubCurrentUserFollows()

    axios.get('/api/getUserPosts').then(res => {
      console.log('res', res)
      this.setState({ posts: res.data })
    })
  }

  getSubhubCurrentUserFollows() {
    axios.get(`/api/getUserSubs/${this.props.match.params.id}`).then(res => {
      this.setState({ followed_subs: res.data })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="User--Container">
        <div className="Subhub-Results--Container ">
          <h3>FOLLOWED SUBHUBS</h3>
          <div className="ruler" />
          {this.state.followed_subs.map(sub => {
            return (
              <div key={sub.subhub_id} className="individual-subhub-section">
                <div className="subhub-left">
                  <div className="talk-bubble tri-right border btm-right-in" alt="subhub">
                    <img src={sub.sh_icon} alt="subhub-icon" />
                  </div>
                  <Link to={`/subhub/${sub.subhub_id}/postfeed`}>
                    <h1>{sub.sh_name}</h1>
                  </Link>
                </div>
                <div className="subhub-right">
                  <p>{sub.sh_desc}</p>
                </div>
                <button
                  onClick={async () =>
                    await axios
                      .delete(
                        `/api/deleteFollow/${this.state.current_user.user_id}/${sub.subhub_id}`
                      )
                      .then(await this.getSubhubCurrentUserFollows())
                  }
                >
                  Unsubscribe
                </button>
              </div>
            )
          })}
        </div>

        <div>
          {this.state.posts.map(post => {
            console.log('post', post)
            return (
              <div key={post.post_id}>
                <PostCard post={post} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default User
