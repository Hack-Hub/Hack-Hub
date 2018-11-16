import React, { Component } from "react";
import axios from 'axios';
import PostCard from '../PostCard/PostCard';
import {Link} from 'react-router-dom';

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
    console.log(this.state)
    return (
        <div>
            <div className="Subhub-Results--Container">
              <h3>SUBHUBS</h3>
              <div className="ruler" />
              {this.state.followed_subs.map(sub => {
                return (
                  <div key={sub.subhub_id} className="individual-subhub-section">
                    <div className="subhub-left">
                      <div className="talk-bubble tri-right border btm-right-in" alt="subhub">
                        <img src={sub.sh_icon} alt="subhub-icon" />
                      </div>
                      <Link to={`/subhub/${sub.subhub_id}/postfeed`}>
                        <h1>{sub.sh_name}</h1>
                      </Link>
                    </div>
                    <div className="subhub-right">
                      <p>{sub.sh_desc}</p>
                    </div>
                      <button>
                        Unsubscribe
                      </button>
                </div>
              )
            })}
          </div>

          <div>
            {this.state.posts.map(post => {
              return (
                <div key={post.post_id}>
                  <PostCard 
                    post={post}
                  />
                </div>
              )
            })}
          </div>
      </div>
    );
  }
}

export default User;
