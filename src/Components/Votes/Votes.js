import React, { Component } from "react";

class Votes extends Component {
    constructor(){
        super()
        this.state={
            votes:0
        }
    }
    componentDidMount(){
        //to-do axios.get(votes for this post).then(this.setState({votes:response}))
    }
    handleClick=(num)=>{
        this.setState({votes:(this.state.votes + num)})
        //to-do axios.put(votes for this post +/-)
    }
  render() {
    return (
    <div>
        <button onClick={()=>this.handleClick(1)}>Upvote</button>
        {this.state.votes}
        <button onClick={()=>this.handleClick(-1)}>Downvote</button>
    </div>
    );
  }
}

export default Votes;
