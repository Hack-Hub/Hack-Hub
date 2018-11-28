import React, { Component } from "react";
import axios from "axios";

class GetSubHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subhubName: "",
      subhubOptions: [],
      userId: null,
      nullUserWarning: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.findSubHub = this.findSubHub.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/getUserSubs")
      .then(subhubs => {
        this.setState({ subhubOptions: subhubs.data });
      })
      .catch(error => console.log(error));
  }

  handleChange = event => {
    this.setState({ subhubName: event.target.value });
  };

  findSubHub = () => {
    axios
      .get("/api/getSubByName/?name=" + this.state.subhubName)
      .then(subhubs => {
        this.setState({ subhubOptions: subhubs.data });
      });
  };

  render() {
    // console.log('this.props', this.props)
    let subOptions = this.state.subhubOptions.map((subhub, idx) => (
      <option key={idx} value={subhub.subhub_id}>
        {subhub.sh_name}
      </option>
    ));
    return (
      <div className="GetSubHub--Container" style={styles.container}>
        <h5>SubHub</h5>
        <div>
          <input
            onChange={this.handleChange}
            style={styles.subhubName}
            placeholder="Enter Subhub Name"
          />
          <button style={styles.button} onClick={this.findSubHub}>
            Search SubHubs
          </button>
        </div>

        <select
          style={styles.select}
          onChange={event => this.props.setID(event.target.value)}
        >
          <option value={null}>Select SubHub</option>
          {subOptions}
        </select>
      </div>
    );
  }
}

const styles = {
  container: { display: "flex", flexDirection: "column" },
  button: {
    backgroundColor: "#0000f7",
    color: "white",
    width: "100px",
    margin: "0 auto"
  },
  subhubName: { width: "500px" },
  select: { width: "300px", margin: "10px auto" }
};

export default GetSubHub;
