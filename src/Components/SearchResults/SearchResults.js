import React, { Component } from 'react'
import axios from 'axios'
import './SearchResults.scss'
import { Link } from 'react-router-dom'

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: '',
      subhubResults: [],
      postResults: [],
      followedHubs: [],
      // change user id when req.sessions is fixed
      userId: 1,
    }

    this.handleSubscribe = this.handleSubscribe.bind(this)
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this)
    this.getSubhubs = this.getSubhubs.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.getSubhubCurrentUserFollows = this.getSubhubCurrentUserFollows.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.setState({ searchResults: id })
    this.getSubhubs()
    this.getPosts()
    this.getSubhubCurrentUserFollows()
  }

  getSubhubs() {
    axios.get('/api/getAllSubhubs').then(response => {
      // console.log('response', response)
      const subhubs = response.data
      // console.log('subhubs', subhubs)
      const filteredSubhubs = []
      for (let i = 0; i < subhubs.length; i++) {
        if (subhubs[i].sh_name.includes(this.state.searchResults)) {
          filteredSubhubs.push(subhubs[i])
        }
      }
      this.setState({ subhubResults: filteredSubhubs })
    })
  }
  getPosts() {
    axios.get('/api/getAllPosts').then(response => {
      // console.log('response', response)
      const posts = response.data
      // console.log('posts', posts)
      const filteredPosts = []
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].title.includes(this.state.searchResults)) {
          filteredPosts.push(posts[i])
        }
      }
      this.setState({ postResults: filteredPosts })
    })
  }

  getSubhubCurrentUserFollows() {
    // TODO!!!! CHANGE 1 WHEN USER SESSIONS IS FIXED
    axios.get(`/api/getUserSubs/${1}`).then(response => {
      // console.log('response', response)

      this.setState({
        followedHubs: response.data.map(hub => hub.subhub_id),
      })
    })
  }

  handleSubscribe() {
    axios.post('/api/addFollow')
  }
  handleUnsubscribe() {
    axios.delete(`/api/deleteFollow/${this.state.userId}`).then(() => {
      this.getSubhubCurrentUserFollows()
    })
  }

  render() {
    // console.log('this.state.followedHubs', this.state.followedHubs)

    return (
      <div className="SearchResults--container">
        {/* <h1>Search Results</h1> */}
        <div className="Subhub-Results--Container">
          <h3>SUBHUBS</h3>
          <div className="ruler" />

          {this.state.subhubResults.map(individualSubhub => {
            const follows = this.state.followedHubs.includes(individualSubhub.subhub_id)

            console.log('this.state.subhubResults', this.state.subhubResults)
            return (
              <div key={individualSubhub.subhub_id} className="individual-subhub-section">
                <div className="subhub-left">
                  <img src={individualSubhub.sh_icon} alt="subhub-icon" />
                  <Link to={`/subhub/${individualSubhub.subhub_id}`}>
                    <h1>{individualSubhub.sh_name}</h1>
                  </Link>
                </div>
                <div className="subhub-right">
                  <p>{individualSubhub.sh_desc}</p>
                </div>
                {follows ? (
                  <button onClick={() => this.handleUnsubscribe(this.state.userId)}>
                    Unsubscribe
                  </button>
                ) : (
                  <button onClick={this.handleSubscribe}>Subscribe</button>
                )}
              </div>
            )
          })}
        </div>

        <div className="Post-Results--Container" />
      </div>
    )
  }
}
export default SearchResults
