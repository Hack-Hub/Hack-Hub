import React, { Component } from "react";
import axios from "axios";
import './Subscribe.scss'

class SubHubSubscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followedHubs: [],
      subscribeError: '',
      userId:null
    };
  }

  componentDidMount(){
    this.getSubhubCurrentUserFollows()
  }
  componentDidUpdate(prevState,prevProps){
    if(this.props.userId !== prevProps.userId){
      this.setState({userId:this.props.userId})
    }
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
                this.props.handleNullUser();
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
