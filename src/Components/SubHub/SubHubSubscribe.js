import React, { Component } from "react";
import axios from "axios";
import './Subscribe.scss'

class SubHubSubscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followedHubs: [],
      subscribeError: ''
    };
  }

  componentDidMount(){
    this.getSubhubCurrentUserFollows()
  }

  getSubhubCurrentUserFollows=()=> {
      axios.get(`/api/getUserSubs`).then(response => {
      this.setState({
        followedHubs: response.data.map(hub => hub.subhub_id)
      });
    });
  }

  handleSubscribe(subhubId) {
    axios
      .post("/api/addFollow", {
        subhubId: subhubId
      })
      .then(() => {
        this.getSubhubCurrentUserFollows();
      });
  }

  handleNullUser() {
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
    const follows = this.state.followedHubs.includes(+this.props.subhub_id)
    return (
      <div>
        {follows ? (
          <button
            className="subscribe-button"
            onClick={async () =>
              await axios
                .delete(`/api/deleteFollow/${this.props.subhub_id}`)
                .then(await this.getSubhubCurrentUserFollows())
            }
          >
            Unsubscribe
          </button>
        ) : (
          <button
            className="subscribe-button"
            onClick={() => {
              if (this.state.userId === null) {
                this.handleNullUser();
              } else {
                this.handleSubscribe(this.props.subhub_id);
              }
            }}
          >
            Subscribe
          </button>
        )}
      </div>
    );
  }
}

export default SubHubSubscribe;
