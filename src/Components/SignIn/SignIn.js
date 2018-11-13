import React, { Component } from 'react'
// import './SignIn.scss'
// import { Auth } from 'aws-amplify'
import axios from 'axios'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = { userId: null }

    // this.signIn = this.signIn.bind(this)
    // this.addUserToDBTable = this.addUserToDBTable.bind(this)
  }

  componentDidMount() {
    axios.get('/api/userById').then(response => {
      console.log('response', response)
      // this.setState({ userId })
    })
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  // signIn = async () => {
  //   // const {}
  //   try {
  //     await Auth.signIn(username, password)
  //     console.log('success sign in')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  render() {
    console.log('this.props', this.props)
    console.log('this.state', this.state)
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
              placeholder="password "
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
            <h3>Sign In</h3>
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
export default SignIn
