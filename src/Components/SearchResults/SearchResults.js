import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './SearchResults.scss'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import SubHubSubscribe from '../SubHub/SubHubSubscribe';
import PostFeed from '../PostFeed/PostFeed';

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: '',
      subhubResults: [],
      postResults: [],
      userId: null,
    }

    this.getSubhubs = this.getSubhubs.bind(this)
    this.getPosts = this.getPosts.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.setState({ searchResults: id })
    this.getUser()
    this.getSubhubs()
    this.getPosts()
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

  render() {
    return (
      <div className="SearchResults--container">
        <div style={{ background: '#f5f5f5' }}>
          {this.state.subscribeError && <ErrorMessage message={this.state.subscribeError} />}
        </div>
        <div className="Subhub-Results--Container">
          <h3>SUBHUBS</h3>
          <div className="ruler" />

          {this.state.subhubResults.map(individualSubhub => {
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
                <SubHubSubscribe subhub_id={individualSubhub.subhub_id}/>
              </div>
            )
          })}
        </div>

        <div className="Subhub-Results--Container" style={{ marginTop: '30px' }}>
          <h3>POSTS</h3>
          <div className="ruler" />
         <PostFeed posts={this.state.postResults}/>
        </div>
      </div>
    )
  }
}
export default SearchResults
