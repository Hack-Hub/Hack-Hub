
import React, { Component } from "react";
import axios from "axios";
import PostFeed from "../PostFeed/PostFeed";
import { Link } from "react-router-dom";
import "./Profile.scss";
import ImageUpload from "../NewPost/ImageUpload";
import SubHubSubscribe from "../SubHub/SubHubSubscribe";


class Profile extends Component {
  constructor() {
    super()

    this.state = {
      current_user: {},
      followed_subs: [],
      posts: [],
      editProfile: false,
      profileURL: "",
      userName: "",
      userId:null
    };


  componentDidMount() {
    axios.get('/api/currentUser').then(res => {
      if (res.data.length) {
        this.setState({
          current_user: res.data[0],
          userName: res.data[0].username,
          userId:res.data[0].user_id
        });

      } else {
        this.props.history.push('/user/' + this.props.match.params.userId)
      }
    })

    this.getSubhubCurrentUserFollows()

    axios.get('/api/getUserPosts').then(res => {
      this.setState({ posts: res.data })
    })
  }

  getSubhubCurrentUserFollows = () => {
    axios.get(`/api/getUserSubs`).then(res => {
      this.setState({ followed_subs: res.data })
    })
  }

  handleChange = event => {
    this.setState({ userName: event.target.value })
  }
  editSave = () => {
    this.setState({ editProfile: !this.state.editProfile })
    if (this.state.userName !== this.state.current_user.username) {
      axios.put('/api/editUserName', { username: this.state.userName })
    }
  }
  savePhoto = imageURL => {
    this.setState({ profileURL: imageURL }, () =>
      axios.put('/api/editUserPhoto/', { user_photo: this.state.profileURL })
    )
  }
  handleNullUser=()=> {
    this.setState({
      subscribeError: 'Must be logged in to subscribe to a subhub',
    })
    setTimeout(
      function() {
        this.setState({
          subscribeError: '',
        })
      }.bind(this),
      3000
    )
  }

  render() {
    let editSave, userField
    if (!this.state.editProfile) {
      editSave = 'Edit Profile'
      userField = null
    }
    if (this.state.editProfile) {
      editSave = 'Save'
      userField = (
        <div>
          <h5>User Name:</h5>
          <input
            value={this.state.userName}
            onChange={this.handleChange}
            className="Profile--editInput"
          />
        </div>
      )
    }
    return (
      <div className="User--Container">
        <div className="Profile--Container" style={{ marginBottom: '20px' }}>
          <div className="subhub-left">
            <img src={this.state.current_user.user_photo} alt="user" />
            <h3>{this.state.current_user.username}</h3>
          </div>
          <div className="subhub-center">
            {userField}
            {this.state.editProfile && (
              <div className="edit-profile-pic">
                <h5>Profile Picture:</h5>
                <ImageUpload setImageURL={this.savePhoto} />
              </div>
            )}
          </div>
          <div className="subhub-rightSide">
            <button className="edit-button" onClick={this.editSave}>
              {editSave}
            </button>
          </div>
        </div>
        <div className="Subhub-Results--Container">
          <h3>FOLLOWED SUBHUBS</h3>
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
                <SubHubSubscribe className="subhub-links" subhub_id={sub.subhub_id}  userId={this.state.userId} handleNullUser={this.handleNullUser}/>

              </div>
            )
          })}
        </div>
        <PostFeed posts={this.state.posts} deleteMode={true} />
      </div>
    )
  }
}

export default Profile
