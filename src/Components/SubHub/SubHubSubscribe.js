import React, { Component } from 'react'
import axios from 'axios'
import './Subscribe.scss'

class SubHubSubscribe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      followedHubs: [],
      userId: null,
    }
  }

  componentDidMount() {
    this.getSubhubCurrentUserFollows()
  }

  getSubhubCurrentUserFollows = () => {
   return axios.get(`/api/getUserSubs`).then(response => {
     this.setState({
        followedHubs: response.data.map(hub => hub.subhub_id),
      })
    })
  }
  handleUnsub=()=>{
    axios.delete(`/api/deleteFollow/${this.props.subhub_id}`)
    .then(()=>this.getSubhubCurrentUserFollows())
  }
  handleSub=()=>{
    axios.post('/api/addFollow',{subhubId:this.props.subhub_id})
    .then(()=>this.getSubhubCurrentUserFollows())
  }
  render() {
    const follows = this.state.followedHubs.includes(+this.props.subhub_id)
    return (
      <div>
        {follows ? (
          <button
            className="subscribe-button"
            onClick={() => {
              if (this.props.userId === null) {
                this.props.handleNullUser()
              } else { 
                this.handleUnsub() 
              }
              }}
          >
            Unsubscribe
          </button>
        ) : (
          <button
            className="subscribe-button"
            onClick={() => {
              if (this.props.userId === null) {
                this.props.handleNullUser()
              } else { 
                this.handleSub() 
              }
            }}
          >
            Subscribe
          </button>
        )}
      </div>
    )
  }
}

export default SubHubSubscribe
