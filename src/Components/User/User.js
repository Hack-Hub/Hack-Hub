import React, { Component } from 'react'
import axios from 'axios'
import PostFeed from '../PostFeed/PostFeed'
import { Link } from 'react-router-dom'
import './User.scss'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

class User extends Component {
    constructor() {
        super()

    this.state = {
        current_user: {},
        followed_subs: [],
        posts: [],
        loggedInUserSubs: [],
        userId: null,
        subscribeError: ''
    }

    this.getSubhubCurrentUserFollows = this.getSubhubCurrentUserFollows.bind(this)
    this.getLoggedInUserSubs = this.getLoggedInUserSubs.bind(this)
    this.getUser = this.getUser.bind(this)
    this.handleSubscribe = this.handleSubscribe.bind(this)
    this.handleNullUser = this.handleNullUser.bind(this)
}

componentDidMount() {
    axios.get(`/api/getUser/${this.props.match.params.userId}`).then(res => {
        this.setState({ current_user: res.data[0] })
    })

    this.getSubhubCurrentUserFollows()
    this.getLoggedInUserSubs()
    this.getUser()

    axios.get(`/api/getUserPosts2/${this.props.match.params.userId}`).then(res => {
        this.setState({ posts: res.data })
    })
}

getUser() {
    axios.get('/api/currentUser').then(response => {
        if (!response.data.length) {
        return
    } else {
        this.setState({ userId: response.data[0].user_id })
        this.getSubhubCurrentUserFollows(this.state.userId)
        }
    })
}

getLoggedInUserSubs() {
    axios.get('/api/getUserSubs').then(async res => {
        await this.setState({loggedInUserSubs: res.data.map(hub => hub.subhub_id)})
    })
}

getSubhubCurrentUserFollows() {
    axios.get(`/api/getSubs/${this.props.match.params.userId}`).then(res => {
        this.setState({ followed_subs: res.data })
    })
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

handleSubscribe(subhubId) {
    axios
        .post('/api/addFollow', {
            userId: this.state.userId,
            subhubId: subhubId,
        })
        .then(() => {
            this.getLoggedInUserSubs()
        })
}

render() {
    return (
        <div className="User--Container">
            <div style={{ background: '#f5f5f5' }}>
                {this.state.subscribeError && <ErrorMessage message={this.state.subscribeError} />}
            </div>
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
                const follows = this.state.loggedInUserSubs.includes(sub.subhub_id)
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
                    {follows ? (
                    <button
                    className="user-button"
                    onClick={async () =>
                        await axios
                        .delete(
                            `/api/deleteFollow/${this.state.userId}/${sub.subhub_id}`
                        )
                        .then( await this.getLoggedInUserSubs())
                    }
                    >
                    Unsubscribe
                    </button>
                    ) : (
                    <button
                        className="user-button"
                        onClick={() => {
                        if (this.state.userId === null) {
                            this.handleNullUser()
                        } else {
                            this.handleSubscribe(sub.subhub_id)
                        }
                        }}
                    >
                        Subscribe
                    </button>
                    )}
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
