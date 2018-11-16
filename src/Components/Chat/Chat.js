import React, { Component } from 'react'
import io from 'socket.io-client'
import './Chat.scss'
import axios from 'axios'

class Chat extends Component {
  constructor() {
    super()

    this.state = {
        message: '',
        messages: [],
        current_user: {
          username: "Anonymous",
          user_id: 0
        }
    }

    this.socket = io('localhost:3001');

    this.socket.on('message', (data) => {
      this.setState({messages: [...this.state.messages, data]})
    })

  }

  sendMessage = (e) => {
    e.preventDefault();
    const message = {
      subhub_id: this.props.match.params.id,
      user_id: this.state.current_user.user_id,
      message_text: this.state.message
    }
    axios.post('/api/newMessage',message).then(this.setState({message: ''})).then(this.scrollToBottom());

    this.socket.emit('send_message', {
      username: this.state.current_user.username,
      message_text: this.state.message,
      room: this.props.match.params.id
    })
  }

  scrollToBottom = () => {
    this.bottom.scrollIntoView({behavior: 'smooth'})
  }

  componentDidMount() {
    axios.get('/api/currentUser').then(res => {
      if(res.data[0]){this.setState({current_user: res.data[0]})}       
    });

    this.socket.emit('room', {
      room: this.props.match.params.id,
      // user: this.state.current_user.username,
    });

    axios.get(`/api/getMessages/${this.props.match.params.id}`).then(res => {
      this.setState({ messages: [...this.state.messages, ...res.data] })
    })

    this.scrollToBottom();
  }

  // sendScroll = () => {
  //   this.sendMessage();
  //   this.scrollToBottom();
  // }


  render() {
    const {message, messages, current_user} = this.state;
    console.log(this.state.current_user);
    let messageList = messages.map((message,i) => {
      return (
          <div key={i}>
            {message.username===current_user.username ? (
              <div className="currentUserMessage">
                <div className="message">
                  <p className="name">{message.username}</p>
                  <p className="text">{message.message_text}</p>
                </div>
              </div>
            ):(
              <div className="otherUsers">
                <div className="message2">
                  <p className="name">{message.username}</p>
                  <p className="text">{message.message_text}</p>
                </div>
              </div>
            )}
          </div>
      )
    })


    return (
      <div className="Chat--container">
        <h3></h3>
        <div className="messageList">
          {messageList}
          <div ref={bottom => {this.bottom = bottom}}/>>
        </div>
        <div>
          <input  type="text" placeholder="Message" value={message} onChange={(e) => this.setState({message: e.target.value})} className="inputMessage"/>
          <button onClick={this.sendMessage} className="send">Send</button>
        </div>
      </div>
    )
  }
}
export default Chat
