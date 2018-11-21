import React, { Component } from 'react'
import './SignOut.scss'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class SignOut extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.routeChange = this.routeChange.bind(this)
  }

  componentDidMount() {
    axios
      .post('/api/destroySession', (req, res) => {
        // req.session.user_id = req.body.user_id
        req.session.destroy()
      })
      .then(this.routeChange())
  }

  routeChange() {
    const path = '/'
    this.props.history.push(path)
  }

  render() {
    // console.log('this.props', this.props)
    return <div className="SignOut--container" />
  }
}

export default withRouter(SignOut)
