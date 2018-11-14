import React, { Component } from 'react'
import io from 'socket.io-client';
import './Chat.scss'
import axios from 'axios'

class Chat extends Component {
  constructor() {
    super()

    this.state = {
        message: '',
        messages: [],
        current_user: []
    }

    this.soket = io('localhost:3001')
  }

  // componentDidMount() {
  //   this.socket.emit('room', {
  //     room: subhubName,
  //     user: userName,
  //   })

  //   axios.get(`/api/messages/${roomID}`).then(res => {
  //     this.setState({ messages: res.data })
  //   })
  // }

  render() {
    return <div className="Chat--container">CHATROOM</div>
  }
}
export default Chat
