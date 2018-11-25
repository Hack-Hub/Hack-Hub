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
      title: '',
      text: null,
      URL: null,
      imageURL: null,
      subhub_id: 0,
      userId: null,
    }
  }

  componentDidMount() {
    axios.get('/api/currentUser').then(async response => {
      // console.log('response', response)
      if (!response.data.length) {
        return
      } else {
        await this.setState({ userId: response.data[0].user_id })
      }
    })
  }

  //set state according to name of input
  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  //change post type and null all values
  handleTypeChange = event => {
    this.setState({ postType: event.target.name, title: null, text: null, URL: null, image: null })
  }
  //axios post call
  handleSubmit = () => {
    const { title, text, URL, imageURL, subhub_id } = this.state
    axios.post('/api/newPost', {
      subhub_id,
      title,
      text_content: text,
      web_url: URL,
      image_url: imageURL,
    })
  }
  //called in GetSubHub
  setSubHubID = id => {
    this.setState({ subhub_id: id })
  }
  //called in ImageUpload
  setImageURL = URL => {
    // console.log(URL)
    this.setState({ imageURL: URL })
  }

  render() {
    const { postType } = this.state
    //conditionally render the post type depending on the button selection
    let inputType = postType
    if (postType === 'Text') {
      inputType = (
        <div>
          <h5>Text</h5>
          <input name="text" className="text-input" onChange={this.handleInput} />
        </div>
      )
    }
    if (postType === 'URL') {
      inputType = (
        <div>
          <h5>URL</h5>
          <input name="URL" className="text-input" onChange={this.handleInput} />
        </div>
      )
    }
    if (postType === 'Image') {
      inputType = (
        <div>
          <h5>Image</h5>
          <ImageUpload setImageURL={this.setImageURL} />
        </div>
      )
    }
    console.log('this.state.subhub_id', this.state.subhub_id)
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
          </section>
          <h5>Title</h5>
          <input name="title" className="text-input" onChange={this.handleInput} />
          {inputType}
        </section>
        <button className="submit-post" onClick={this.handleSubmit}>
          Submit Post
        </button>
      </div>
    )
  }
}

export default NewPost
