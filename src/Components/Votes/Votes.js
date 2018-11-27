import React, { Component } from "react";
import axios from "axios";
import './Votes.scss';
class Votes extends Component {
  constructor() {
    super();
    this.state = {
      voted: false,
      up: false,
      down: false,
      voteCount:0
    };
  }
  componentDidMount() {
    const { post_id } = this.props;
    //init with votes passed in
    this.setState({voteCount:this.props.votes})
    //get up/down vote data for current user
    axios.get("/api/getVotes/" + post_id).then(response => {
        if(response.data.length){
            this.updateVoteStatus(response.data[0].vote_status)
            this.setState({voteCount:response.data[0].votes})
        }
    });
  }
  componentDidUpdate(prevProps,prevState) {
    if (this.state.voted !== prevState.voted) {
      const { post_id } = this.props;
      axios.get("/api/getVotes/" + post_id).then(response => {
        if(response.data[0].vote_status){
            this.updateVoteStatus(response.data[0].vote_status)
            this.setState({voteCount:response.data[0].votes})
        }else{
            this.updateVoteStatus(0)
            this.setState({voteCount:response.data[0].votes})
        }
      });
    }
  }

  updateVoteStatus=(vote_status)=>{
    if (vote_status === 1) {
        this.setState({ up: true, down: false});
      }
      if (vote_status === -1) {
        this.setState({ up: false, down: true});
      }
      if (vote_status === 0) {
        this.setState({ up: false, down: false});
      }
  }

  handleUpVote = () => {
    const { post_id } = this.props;
    axios
      .post("/api/postUpVote", { post_id })
      .then(() => this.setState({ voted: !this.state.voted }))
      .catch(() => alert("Sign In to post a vote."));
  };

  handleDownVote = () => {
    const { post_id } = this.props;
    axios
      .post("/api/postDownVote", { post_id })
      .then(() => this.setState({ voted: !this.state.voted }))
      .catch(() => alert("Sign In to post a vote."));
  };

  render() {
    let up;
    let down; 
    if (this.state.up){up = <button className="fa fa-2x fa-arrow-up orange" onClick={this.handleUpVote} />}
    if (this.state.down){down = <button className="fa fa-2x fa-arrow-down orange"  onClick={this.handleDownVote}/>}
    if (!this.state.up){up = <button className="fa fa-2x fa-arrow-up" onClick={this.handleUpVote} />}
    if (!this.state.down){down = <button className="fa fa-2x fa-arrow-down"  onClick={this.handleDownVote}/>}
    return (
      <div className="votes-section">
        {up}
        {this.state.voteCount}
        {down}
      </div>
    );
  }
}

export default Votes;
