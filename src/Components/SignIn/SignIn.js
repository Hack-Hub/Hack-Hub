import React, { Component } from 'react'
import './SignIn.scss'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: {},
      signInError: '',
      userHash: '',
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
    await Auth.signIn(username, password)
      .then(user => this.setState({ user }))
      .then(() => this.postUserToTable(this.state.user))
      // await Auth.confirmSignIn(this.state.user)
      //   .then(data => console.log('data', data))
      //   .catch(err => console.log('err', err))

      .catch(err => {
        console.log('err', err)
        this.setState({ signInError: 'Sorry, your username/password is incorrect.' })
      })
  }

  async postUserToTable() {
    await axios
      .post('/api/newUser', {
        username: this.state.user.username,
        userHash: this.props.history.location.state.userHash,
      })
      .then(response => {
        // console.log('response.data[0].user_id', response.data[0].user_id)
        axios
          .post('/api/userSession', {
            user_id: response.data[0].user_id,
          })
          .then(this.routeChange())
      })
  }

  routeChange() {
    this.props && this.props.setLoggedIn()
    const path = this.props.location.pathname.split('').filter((char, idx) => {
      const newPath = []
      if (idx >= 7) {
        newPath.push(char)
      }
      return newPath.join('')
    })
    const newPath = path.join('')

    this.props.history.push(newPath)
  }

  closeModal() {
    this.props.history.goBack()
  }

  render() {
    console.log('this.props', this.props)
    console.log('this.state', this.state)
    return (
      <div className="SignIn--container">
        <button
          className="close-button"
          onClick={() => {
            this.closeModal()
          }}
        >
          <img src="https://i.imgur.com/dOUsAsy.png" alt="close" />
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
          {this.state.signInError && <ErrorMessage message={this.state.signInError} />}
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
