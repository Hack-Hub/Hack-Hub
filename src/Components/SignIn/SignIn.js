import React, { Component } from 'react'
import './SignIn.scss'
import axios from 'axios'
import { Auth } from 'aws-amplify'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '', user: {} }

    this.onChange = this.onChange.bind(this)
    this.signIn = this.signIn.bind(this)
    this.postUserToTable = this.postUserToTable.bind(this)
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  signIn = async () => {
    const { username, password } = this.state
    await Auth.signIn(username, password)
      .then(user => this.setState({ user }))
      .then(() => this.postUserToTable(this.state.user))
      .catch(err => console.log('err', err))
  }

  postUserToTable() {
    console.log('this.state.user', this.state.user)
    console.log('this.state.user.pool.client.clientId', this.state.user.pool.clientId)
    axios.post('/api/newUser', {
      userClientId: this.state.user.pool.clientId,
      username: this.state.user.username,
    })
  }
  // confirmSignIn = async () => {
  //   await Auth.confirmSignIn(user, code, mfaType)
  //     .then(data => console.log('data', data))
  //     .catch(err => console.log('err', err))
  // }

  render() {
    console.log('this.props', this.props)
    console.log('this.state', this.state)
    return (
      <div className="SignIn--container">
        <div className="sign-in">
          <h3>Sign In</h3>
          <input
            onChange={this.onChange}
            placeholder="username"
            name="username"
            style={styles.input}
          />
          <input
            onChange={this.onChange}
            placeholder="password"
            name="password"
            type="password"
            style={styles.input}
          />
          <button onClick={this.signIn}> Sign In</button>
        </div>
      </div>
    )
  }
}

const styles = {
  inputs: { height: 35, margin: 10 },
}

export default SignIn
