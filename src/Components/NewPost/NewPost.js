import React, { Component } from 'react'
import './NewPost.scss'
import ImageUpload from './ImageUpload'
import GetSubHub from './GetSubHub'
import axios from 'axios'

class NewPost extends Component {
  constructor() {
    super()
    this.state = {
      postType: 'Text',
      code: '',
      title: '',
      text: null,
      URL: null,
      imageURL: null,
      videoURL: null,
      subhub_id: 0,
      userId: null,
    }
  }

  componentDidMount() {
    axios.get('/api/currentUser').then(response => {
      if (response.data.length) {
        this.setState({ userId: response.data[0].user_id })
      }
    })
  }

  //set state according to name of input
  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  //change post type and null all values
  handleTypeChange = event => {
    this.setState({
      postType: event.target.name,
      text: null,
      URL: null,
      imageURL: null,
      videoURL: null,
      code: null,
    })
  }
  //axios post call
  handleSubmit = () => {
    const { title, text, URL, imageURL, videoURL, subhub_id, code } = this.state
    axios
      .post('/api/newPost', {
        subhub_id,
        title,
        text_content: text,
        web_url: URL,
        image_url: imageURL,
        video_url: videoURL,
        code,
      })
      .then(response => {
        this.props.history.push('/postview/' + response.data[0].post_id)
      })
  }
  //called in GetSubHub
  setSubHubID = id => {
    this.setState({ subhub_id: id })
  }
  //called in ImageUpload
  setImageURL = URL => {
    if (this.state.postType === 'Image') {
      this.setState({ imageURL: URL })
    } else if (this.state.postType === 'Video') {
      this.setState({ videoURL: URL })
    }
  }

  handleSnippet = event => {
    this.setState({ code: '```\n' + event.target.value + '\n```' })
  }

  render() {
    const { postType } = this.state
    //conditionally render the post type depending on the button selection

    let inputType

    if (postType === 'Text') {
      inputType = <textarea name="text" className="text-input" onChange={this.handleInput} />
    }

    if (postType === 'URL') {
      inputType = <input name="URL" className="text-input" onChange={this.handleInput} />
    }
    if (postType === 'Image' || postType === 'Video') {
      inputType = <ImageUpload setImageURL={this.setImageURL} />
    }
    if (postType === 'Code') {
      inputType = (
        <pre>
          <code>
            <textarea name="code" onChange={this.handleSnippet} />
          </code>
        </pre>
      )
    }

    return (
      <div className="NewPost--Container">
        {this.state.userId === null && (
          <div style={{ margin: '30px auto' }}>
            <h1>You must be signed in to create a new post.</h1>
          </div>
        )}
        <h3>New Post</h3>
        <div className="ruler" />

        <section className="newpost-input">
          <GetSubHub userId={this.state.userId} setID={this.setSubHubID} />

          <h5>Title</h5>
          <input
            name="title"
            className="text-input"
            onChange={this.handleInput}
            value={this.state.title}
          />
          <h5>Post Type</h5>
          <section className="newpost-type">
            <button name="Text" onClick={this.handleTypeChange}>
              Text
            </button>
            <button name="URL" onClick={this.handleTypeChange}>
              URL
            </button>
            <button name="Image" onClick={this.handleTypeChange}>
              Image
            </button>
            <button name="Video" onClick={this.handleTypeChange}>
              Video/GIF
            </button>
            <button name="Code" onClick={this.handleTypeChange}>
              Code Block
            </button>
          </section>
          <div>
            <h5>{postType}</h5>
            {inputType}
          </div>
        </section>
        <button className="submit-post" onClick={this.handleSubmit}>
          Submit Post
        </button>
      </div>
    )
  }
}

export default NewPost
