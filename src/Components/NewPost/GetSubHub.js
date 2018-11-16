import React, { Component } from 'react'
import axios from "axios";

class GetSubHub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subhubName: '',
      subhubOptions: []
    }
  }

  componentDidMount() {
    axios.get('/api/getUserSubs')
      .then(subhubs => {
        this.setState({ subhubOptions: subhubs.data })
      })
  }

  handleChange = event => {
    this.setState({ subhubName: event.target.value })
  }

  findSubHub = () => {
    axios.get('/api/getSubByName/?name=' + this.state.subhubName)
      .then(subhubs => {
        this.setState({ subhubOptions: subhubs.data })
      });
  }

  render() {
    let subOptions = this.state.subhubOptions.map((subhub, idx) => <option key={idx} value={subhub.subhub_id}>{subhub.sh_name}</option>)
    return (
      <div>
        <h5>SubHub</h5>
        <div>
          <input onChange={this.handleChange} placeholder="enter subhub id" />
          <button onClick={this.findSubHub}>Find SubHub</button>
        </div>
        <select onChange={this.props.setSubHubID}>
          <option value={null}>Select One</option>
          {subOptions}
        </select>
      </div>
    )
  }
}

export default GetSubHub
