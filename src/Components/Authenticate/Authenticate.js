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
    this.closeModal = this.closeModal.bind(this)
  }

  routeChange() {
    const path = '/signIn'
    this.props.history.push(path)
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  // onChangeSetNumber(event) {
  //   // const newNumber = `+1${event.target.value}`
  //   this.setState({ phone_number: eve })
  // }

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

  closeModal() {
    this.props.history.goBack()
  }

  render() {
    console.log('this.props', this.props)

    return (
      <div className="Authentication--container">
        <button
          className="close-button"
          onClick={() => {
            this.closeModal()
          }}
        >
          <img src="http://i65.tinypic.com/29ehdth.png" />
        </button>
        {this.state.step === 0 && (
          <div className="auth-section">
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
              placeholder="+1 (xxx) xxx - xxx"
              name="phone_number"
              // type="number"
              // id="phone"
              style={styles.input}
            />
            <button className="sign-up" onClick={this.signUp}>
              Send Authentication Code
            </button>
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
