import React, { Component } from "react";

class User extends Component {
  constructor(){
    super();

    this.state = {
      current_user: [],
      followed_subs: [],
      posts: []
    }
  }

  componentDidMount(){
    axios.get('/api/currentUser').then(res => {
      this.setState({current_user: res.data[0]}); 
    });

    axios.get('/api/getUserSubs').then(res => {
      this.setState({followed_subs: res.data});
    });

    axios.get('/api/getUserPosts').then(res => {
      this.setState({posts: res.data})
    })
  }


  render() {
    return (
      <div>
          <h1>User</h1>
      </div>
    );
  }
}

export default User;
