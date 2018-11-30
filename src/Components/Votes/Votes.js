import React, { Component } from 'react'
import axios from 'axios'
import './Votes.scss'
import ErrorMessage from "../ErrorMessage/ErrorMessage";


class Votes extends Component {
  constructor() {
    super()
    this.state = {
      voted: false,
      up: false,
      down: false,
      voteCount: 0,
    }
  }
  componentDidMount() {
    const { post_id } = this.props
    //init with votes passed in
    this.setState({ voteCount: this.props.votes })
    //get up/down vote data for current user
    axios.get('/api/getVotes/' + post_id).then(response => {
      if (response.data.length) {
        this.updateVoteStatus(response.data[0].vote_status)
        this.setState({ voteCount: response.data[0].votes })
      }
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.voted !== prevState.voted) {
      const { post_id } = this.props
      axios.get('/api/getVotes/' + post_id).then(response => {
        if (response.data[0].vote_status) {
          this.updateVoteStatus(response.data[0].vote_status)
          this.setState({ voteCount: response.data[0].votes })
        } else {
          this.updateVoteStatus(0)
          this.setState({ voteCount: response.data[0].votes })
        }
      })
    }
  }

  updateVoteStatus = vote_status => {
    if (vote_status === 1) {
      this.setState({ up: true, down: false })
    }
    if (vote_status === -1) {
      this.setState({ up: false, down: true })
    }
    if (vote_status === 0) {
      this.setState({ up: false, down: false })
    }
  }

  handleUpVote = () => {
    const { post_id } = this.props;
    if(this.props.userId){
      axios
        .post('/api/postUpVote', { post_id })
        .then(() => this.setState({ voted: !this.state.voted }))
    }else{
      this.handleNullUser()
    }
  }

  handleDownVote = () => {
    const { post_id } = this.props
    if(this.props.userId){
      axios
      .post('/api/postDownVote', { post_id })
      .then(() => this.setState({ voted: !this.state.voted }))
    }else{
      this.handleNullUser()
    }
  }

  handleNullUser = () => {
    this.setState({
      subscribeError: "Must be logged in to vote on a post"
    });
    setTimeout(
      function() {
        this.setState({
          subscribeError: ""
        });
      }.bind(this),
      3000
    );
  };

  render() {
    let up
    let down
    if (this.state.up) {
      up = <button className="fa fa-2x fa-chevron-up orange arrow" onClick={this.handleUpVote} />
    }
    if (this.state.down) {
      down = (
        <button className="fa fa-2x fa-chevron-down orange arrow" onClick={this.handleDownVote} />
      )
    }
    if (!this.state.up) {
      up = <button className="fa fa-2x fa-chevron-up arrow" onClick={this.handleUpVote} />
    }
    if (!this.state.down) {
      down = <button className="fa fa-2x fa-chevron-down arrow" onClick={this.handleDownVote} />
    }
    return (
      <div className="votes-section">
          {this.state.subscribeError && (
            <ErrorMessage message={this.state.subscribeError} />
          )}
        {up}
        <p className="vote-number">{this.state.voteCount}</p>
        {down}
      </div>
    )
  }
}

export default Votes
