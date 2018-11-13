import React, { Component } from 'react';

class Chat extends Component {
  constructor() {
    super()

    this.state = {
        message: '',
        messages: []
    }

    this.soket = io('localhost:3002');

    
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}
export default Chat