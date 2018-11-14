import React, { Component } from "react";
import axios from 'axios'
class Votes extends Component {
    
    handleUpVote=()=>{
        axios.post('/api/postUpVote')
    }
    handleDownVote=()=>{
        axios.post('/api/postDownVote')
    }
  render() {
    return (
    <div>
        <button onClick={this.handleUpVote}>Upvote</button>
        {this.props.votes}
        <button onClick={this.handleDownVote}>Downvote</button>
    </div>
    );
  }
}

export default Votes;
