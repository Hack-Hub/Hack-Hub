import React, { Component } from 'react'
//import './SearchResults.scss';

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    console.log('this.props', this.props)
    // const searchResults = this.props.match.params

    return (
      <div className="">
        <h1>SearchResults</h1>
      </div>
    )
  }
}
export default SearchResults
