import React, { Component } from 'react'
import './SignOut.scss'
// import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'

class SignOut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // username: '',
      // password: '',
      user: {},
      // authState: props.authState,
      // authData: props.authData,
    }

    this.signOut = this.signOut.bind(this)
    this.routeChange = this.routeChange.bind(this)
  }

  componentDidMount() {
    this.signOut()
    this.setState({ user: null })
  }

  signOut = async () => {
    try {
      await Auth.signOut()
      // console.log('signout success')
    } catch (err) {
      console.log('err', err)
    }

    this.routeChange()
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
