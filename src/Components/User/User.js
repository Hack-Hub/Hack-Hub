import React, { Component } from 'react'
import axios from 'axios'
import PostFeed from '../PostFeed/PostFeed'
import { Link } from 'react-router-dom'
import './User.scss'

class User extends Component {
    constructor() {
        super()

    this.state = {
        current_user: {},
        followed_subs: [],
        posts: [],
        loggedInUserSubs: []
    }

    this.getSubhubCurrentUserFollows = this.getSubhubCurrentUserFollows.bind(this)
}

componentDidMount() {
    axios.get(`/api/getUser/${this.props.match.params.userId}`).then(res => {
        this.setState({ current_user: res.data[0] })
    })

    this.getSubhubCurrentUserFollows()

    this.getLoggedInUserSubs()

    axios.get(`/api/getUserPosts2/${this.props.match.params.userId}`).then(res => {
        this.setState({ posts: res.data })
    })
}

getLoggedInUserSubs() {
    axios.get('/api/getUserSubs').then(res => {
        this.setState({loggedInUserSubs: res.data})
    })
}

getSubhubCurrentUserFollows() {
    axios.get(`/api/getSubs/${this.props.match.params.userId}`).then(res => {
        this.setState({ followed_subs: res.data })
    })
}

render() {
    console.log(this.state);
    return (
        <div className="User--Container">
            <div className="Profile--Container" style={{ marginBottom: '20px' }}>
            <div className="subhub-left">
                <img src={this.state.current_user.user_photo} alt="user" />
                <h3>{this.state.current_user.username}</h3>
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
                </div>
                )
            })}
            </div>

            <div>
            <PostFeed posts={this.state.posts}/>
            </div>
        </div>
        )
    }
}

export default User
