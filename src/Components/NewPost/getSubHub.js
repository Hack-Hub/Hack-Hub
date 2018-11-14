import React, { Component } from 'react'
// import axios from "axios";

class GetSubHub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subhubName: '',
      //delete after todo's are done
      found: false,
    }
  }
  handleChange = event => {
    this.setState({ subhubName: event.target.value })
  }
  findSubHub = () => {
    //to-do: get id for subhub based on name entered
    // axios.get('/api/getSubHubByName/name='+this.state.subhubName)

    //delete this after to-do is done
    this.props.setID(this.state.subhubName)
    this.setState({ found: true })
  }
  render() {
    return (
      <div>
        <input onChange={this.handleChange} placeholder="enter subhub id" />
        <button onClick={this.findSubHub}>Find SubHub</button>
        {`${this.state.found}`}
      </div>
    )
  }
}

export default GetSubHub
