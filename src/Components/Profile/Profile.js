import React, { Component } from 'react'
import axios from 'axios'
import PostCard from '../PostCard/PostCard'
import { Link } from 'react-router-dom'
import './Profile.scss'
import ImageUpload from '../NewPost/ImageUpload'

class Profile extends Component {
  constructor() {
    super()

    this.state = {
      current_user: {},
      followed_subs: [],
      posts: [],
      editProfile: false,
      profileURL:''
    }

    this.getSubhubCurrentUserFollows = this.getSubhubCurrentUserFollows.bind(this)
    this.editSave =this.editSave.bind(this)
    this.savePhoto = this.savePhoto.bind(this)
  }

  componentDidMount() {
    axios.get('/api/currentUser').then(res => {
      if(res.data.length){
        this.setState({ current_user: res.data[0] })
      }else{
        this.props.history.push('/user/'+this.props.match.params.userId)
      }
    })

    this.getSubhubCurrentUserFollows()

    axios.get('/api/getUserPosts').then(res => {
      this.setState({ posts: res.data })
    })
  }

  getSubhubCurrentUserFollows() {
    axios.get(`/api/getUserSubs`).then(res => {
      this.setState({ followed_subs: res.data })
    })
  }

  editSave() {
    this.setState({ editProfile: !this.state.editProfile })
  }
  savePhoto(imageURL){
    this.setState({profileURL:imageURL},()=>axios.put('/api/editUserPhoto/',{user_photo:this.state.profileURL}))
  }

  render() {
    let editSave,userField;
    if(!this.state.editProfile){
      editSave='Edit Photo'
      userField= <h3>{this.state.current_user.username}</h3>
    }
    if(this.state.editProfile){
      editSave='Save'
      userField = <input placeholder={this.state.current_user.username}></input>
    }
    return (
      <div className="User--Container">
        {this.state.editProfile && (
          <div className="edit-profile-pic">
            <ImageUpload setImageURL={this.savePhoto} />
          </div>
        )}

        <div className="Profile--Container" style={{ marginBottom: '20px' }}>
          <div className="subhub-left">
            <img src={this.state.current_user.user_photo} alt="user" />
            {userField}
          </div>
          <div className="subhub-right">
          <button className="edit-button" onClick={this.editSave}>{editSave}</button>
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
                <button
                  className="user-button"
                  onClick={async () =>
                    await axios
                      .delete(
                        `/api/deleteFollow/${this.state.current_user.user_id}/${sub.subhub_id}`
                      )
                      .then(this.getSubhubCurrentUserFollows())
                  }
                >
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
                <PostCard post={post} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Profile
