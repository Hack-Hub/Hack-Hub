import React, { Component } from 'react'
import './PostCard.scss'

class PostCard extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div className="PostCard--container">
        <section className="Card--section--header">
          <div className="left-postcard">
            <div className="user-image" />
            <h1>Title goes here</h1>
          </div>
          <div className="right-postcard">
            <div className="time-stamp">Timestamp// SubHub Here?</div>
          </div>
        </section>
        <section className="Card--section--body">
          <p className="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </section>
        <section className="votes">
          <i className="fa fa-2x fa-arrow-up" />
          <p>1234</p>
          <i className="fa fa-2x fa-arrow-down" />
        </section>
      </div>
    )
  }
}
export default PostCard
