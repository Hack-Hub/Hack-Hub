import React, { Component } from "react";
import axios from 'axios'
class Votes extends Component {
    handleUpVote = () => {
        const { post_id } = this.props
        axios.post('/api/postUpVote', { post_id })
    }

    handleDownVote = () => {
        const { post_id } = this.props
        axios.post('/api/postDownVote', { post_id })
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
