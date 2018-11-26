import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './SearchResults.scss'
import PostCard from '../PostCard/PostCard'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: '',
      subhubResults: [],
      postResults: [],
      followedHubs: [],
      userId: null,
      subscribeError: '',
    }

    this.handleSubscribe = this.handleSubscribe.bind(this)
    this.getSubhubs = this.getSubhubs.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.getSubhubCurrentUserFollows = this.getSubhubCurrentUserFollows.bind(this)
    this.handleNullUser = this.handleNullUser.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.setState({ searchResults: id })
    this.getUser()
    this.getSubhubs()
    this.getSubhubCurrentUserFollows()
    this.getPosts()
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

  getSubhubs() {
    axios.get('/api/getAllSubhubs').then(response => {
      const subhubs = response.data
      const filteredSubhubs = []
      for (let i = 0; i < subhubs.length; i++) {
        if (subhubs[i].sh_name.toLowerCase().includes(this.state.searchResults.toLowerCase())) {
          filteredSubhubs.push(subhubs[i])
        }
      }
      this.setState({ subhubResults: filteredSubhubs })
    })
  }

  getPosts() {
    axios.get('/api/getAllPosts').then(response => {
      const posts = response.data
      const filteredPosts = []
      for (let i = 0; i < posts.length; i++) {
        // console.log('posts', posts[i].title.toLowerCase())
        if (posts[i].title.toLowerCase().includes(this.state.searchResults)) {
          filteredPosts.push(posts[i])
        }
      }
      this.setState({ postResults: filteredPosts })
    })
  }

  getSubhubCurrentUserFollows() {
    axios.get(`/api/getUserSubs`).then(async response => {
      await this.setState({
        followedHubs: response.data.map(hub => hub.subhub_id),
      })
    })
  }

  handleSubscribe(subhubId) {
    axios
      .post('/api/addFollow', {
        userId: this.state.userId,
        subhubId: subhubId,
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
    // console.log('this.state', this.state)
    // console.log('this.state.subscribeError', this.state.subscribeError)
    return (
      <div className="SearchResults--container">
        <div style={{ background: '#f5f5f5' }}>
          {this.state.subscribeError && <ErrorMessage message={this.state.subscribeError} />}
        </div>
        <div className="Subhub-Results--Container">
          <h3>SUBHUBS</h3>
          <div className="ruler" />

          {this.state.subhubResults.map(individualSubhub => {
            const follows = this.state.followedHubs.includes(individualSubhub.subhub_id)
            return (
              <div key={individualSubhub.subhub_id} className="individual-subhub-section">
                <div className="subhub-left">
                  <div className="talk-bubble tri-right border btm-right-in" alt="subhub">
                    <img src={individualSubhub.sh_icon} alt="subhub-icon" />
                  </div>
                  <Link to={`/subhub/${individualSubhub.subhub_id}/postfeed`}>
                    <h1>{individualSubhub.sh_name}</h1>
                  </Link>
                </div>
                <div className="subhub-right">
                  <p>{individualSubhub.sh_desc}</p>
                </div>
                {follows ? (
                  <button
                    className="subscribe-button"
                    onClick={async () =>
                      await axios
                        .delete(`/api/deleteFollow/${individualSubhub.subhub_id}`)
                        .then(await this.getSubhubCurrentUserFollows())
                    }
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    className="subscribe-button"
                    onClick={() => {
                      if (this.state.userId === null) {
                        this.handleNullUser()
                      } else {
                        this.handleSubscribe(individualSubhub.subhub_id)
                      }
                    }}
                  >
                    Subscribe
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className="Subhub-Results--Container" style={{ marginTop: '30px' }}>
          <h3>POSTS</h3>
          <div className="ruler" />
          {this.state.postResults.map(post => {
            return (
              <div key={post.post_id} className="individual-post-section">
                <PostCard
                  post={post}
                  // postId={post.post_id}
                  // postTitle={post.title}
                  // postContent={post.text_content}
                  // timePosted={post.post_date_time}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
export default SearchResults
