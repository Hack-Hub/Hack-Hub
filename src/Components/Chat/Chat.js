import React, { Component } from 'react'
import './Chat.scss'

class Chat extends Component {
  constructor() {
    super()

    this.state = {
      message: '',
      messages: [],
    }

    // this.soket = io('localhost:3001')
  }
  render() {
    return <div className="Chat--container">CHATROOM</div>
  }
}
export default Chat
