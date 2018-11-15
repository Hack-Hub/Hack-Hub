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

    this.socket = io('localhost:3001');

    this.socket.on('message', (data) => {
      console.log(data);
      this.setState({messages: [...this.state.messages, data]})
    })

    this.sendMessage = e => {
      e.preventDefault();
      this.socket.emit('send_message', {
        username: this.state.current_user.username,
        message_text: this.state.message,
        room: 'test 1'
      })
      this.setState({message: ''});
    }
  }

  componentDidMount() {
    axios.get('/api/currentUser').then(res => {
      this.setState({current_user: res.data[0]});
    }).then(this.socket.emit('room', {
      room: 'test 1',
      user: this.state.current_user.username,
    }));
    axios.get(`/api/getMessages/2`).then(res => {
      console.log(res);
      this.setState({ messages: res.data })
    })
  }

  render() {
    let messageList = this.state.messages.map((message,i) => {
      return (
          <div key={i}>
              <p>{message.username}</p>
              <p>{message.message_text}</p>
          </div>
      )
    })


    return (
      <div className="Chat--container">
        <div>{messageList}</div>
        <div>
          <input  type="text" placeholder="Message" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})}/>
          <button onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    )
  }
}
export default Chat
