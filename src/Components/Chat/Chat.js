import React, { Component } from 'react';

class Chat extends Component {
  constructor() {
    super()

    this.state = {
        message: '',
        messages: []
    }

    this.soket = io('localhost:3001');

    
    
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}
export default Chat