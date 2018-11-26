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
            <div className="votes-section">
                <button className="fa fa-2x fa-arrow-up" onClick={this.handleUpVote}></button>
                {this.props.votes}
                <button  className="fa fa-2x fa-arrow-down" onClick={this.handleDownVote}></button>
            </div>
        );
    }
}

export default Votes;
