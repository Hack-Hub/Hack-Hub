import React, { Component } from 'react'
import './SignIn.scss'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Auth } from 'aws-amplify'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: {},
      authState: props.authState,
      authData: props.authData,
    }

    this.onChange = this.onChange.bind(this)
    this.signIn = this.signIn.bind(this)
    this.postUserToTable = this.postUserToTable.bind(this)
    this.routeChange = this.routeChange.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  signIn = async () => {
    const { username, password } = this.state
    await Auth.signIn(username, password).then(user => this.setState({ user }))
    await Auth.confirmSignIn(this.state.user)
      .then(data => console.log('data', data))
      .catch(err => console.log('err', err))
      .then(() => this.postUserToTable(this.state.user))
      .then(this.forceUpdate())

      .catch(err => console.log('err', err))
  }

  postUserToTable() {
    // console.log('this.state.user.pool.client.clientId', this.state.user.pool.clientId)
    axios
      .post('/api/newUser', {
        userClientId: this.state.user.pool.clientId,
        username: this.state.user.username,
      })
      .then(response => {
        console.log('response.data', response.data)
        console.log('response.data[0].user_id', response.data[0].user_id)
        axios
          .post('/api/userSession', {
            user_id: response.data[0].user_id,
          })
          .then(this.routeChange())
      })
  }

  routeChange() {
    const path = '/dashboard'
    this.props.history.push(path)
  }

  closeModal() {
    this.props.history.goBack()
  }

  render() {
    // console.log('this.props', this.props)
    console.log('this.state', this.state)
    return (
      <div className="SignIn--container">
        <button
          className="close-button"
          onClick={() => {
            this.closeModal()
          }}
        >
          <img src="http://i65.tinypic.com/29ehdth.png" alt="close" />
        </button>
        <div className="auth-section">
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
          <button className="sign-up" onClick={this.signIn}>
            Sign In
          </button>
        </div>
      </div>
    )
  }
}

const styles = {
  inputs: { height: 35, margin: 10 },
}

export default withRouter(SignIn)
