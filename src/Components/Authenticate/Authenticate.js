import React, { Component } from 'react'
import './Authenticate.scss'
import { Auth } from 'aws-amplify'
import { withRouter } from 'react-router-dom'

class Authenticate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      phone_number: '',
      authenticationCode: '',
      step: 0,
    }

    this.onChange = this.onChange.bind(this)
    this.signUp = this.signUp.bind(this)
    this.confirmSignUp = this.confirmSignUp.bind(this)
    this.routeChange = this.routeChange.bind(this)
  }

  routeChange() {
    const path = '/signIn'
    this.props.history.push(path)
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    try {
      await Auth.signUp({ username, password, attributes: { email, phone_number } }).then(user =>
        console.log('user', user)
      )
      console.log('success sign up')
      this.setState({ step: 1 })
    } catch (err) {
      console.log(err)
    }
  }

  confirmSignUp = async () => {
    const { username, authenticationCode } = this.state
    try {
      await Auth.confirmSignUp(username, authenticationCode).then(this.routeChange())
    } catch (err) {
      console.log('error', err)
    }
  }

  render() {
    console.log('this.state', this.state)
    console.log('this.props', this.props)

    return (
      <div className="Authentication--container">
        {this.state.step === 0 && (
          <div>
            <h3>Sign Up</h3>
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
            <input
              onChange={this.onChange}
              placeholder="email "
              name="email"
              style={styles.input}
            />
            <input
              onChange={this.onChange}
              placeholder="phone number"
              name="phone_number"
              style={styles.input}
            />
            <button onClick={this.signUp}>Sign Up</button>
          </div>
        )}
        {this.state.step === 1 && (
          <div>
            <h3>Sign Up</h3>
            <input
              onChange={this.onChange}
              placeholder="username"
              name="username"
              style={styles.input}
            />

            <input
              onChange={this.onChange}
              placeholder="authentication code"
              name="authenticationCode"
              style={styles.input}
            />
            <button onClick={this.confirmSignUp}>Confirm Sign Up</button>
          </div>
        )}
      </div>
    )
  }
}

const styles = {
  inputs: { height: 35, margin: 10 },
}
export default withRouter(Authenticate)
