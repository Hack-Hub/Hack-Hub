import React, { Component } from "react";
import NewComment from "./NewComment";

class Comments extends Component {
    render() {
        return (
            <div>
                <div>Comments</div>
                <NewComment post_id={this.props.post.post_id} parent_id={null}/>
            </div>
        );
    }
}

export default Comments;
