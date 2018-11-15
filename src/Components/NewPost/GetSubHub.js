import React, { Component } from 'react'
import axios from "axios";

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
    console.log(this.state.subhubName);
    
    axios.get('/api/getSubByName/sub?name='+this.state.subhubName)
      .then(response=>console.log(response));

    //delete this after to-do is done
    // this.props.setID(this.state.subhubName)
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
