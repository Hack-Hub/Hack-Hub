import React, { Component } from "react";
import NewComment from "./NewComment";
import axios from "axios";
import './Comments.scss'

class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
            comments:[]
        }
    }
    //get comments once post has loaded
    componentDidUpdate(prevProps){
        if(prevProps.post !== this.props.post){
            axios.get('/api/getcomments/'+this.props.post.post_id)
                .then(comments=>{this.commentSetUp(comments.data)})
        }
    }

    commentSetUp=(commentsArr)=>{
        let ParentComments= [];
        let NewArr = commentsArr;
        NewArr.forEach(comment => {
            comment.children=[];
            console.log('comment',comment);
            this.findChildren(comment,commentsArr)
            console.log('comment',comment);
        });
      
        console.log('ParentComments',ParentComments);
        this.setState({comments:ParentComments})
    }

    findChildren=(comment,commentsArr)=>{
        for(let i =0;i<commentsArr.length;i++){
            if(comment.comment_id===commentsArr[i].parent_comment_id){
                this.findChildren(commentsArr[i],commentsArr)
                comment.children.push(commentsArr[i])
            }
        }
        return null;
    }

    render() {
        // let commentDisplay = this.state.comments.map(comment=>{
        //     console.log('comment',comment);
        //  if(!comment.parent_comment_id){
        //      return( 
        //         <div >
        //         <h2>{comment.comment_date_time}</h2>
        //         <h4>{comment.comment_text}</h4>
        //         </div>
        //         )}
        // })
        return (
            <div className='comment'>
                <div>Comments</div>
                <NewComment post_id={this.props.post.post_id} parent_id={null}/>
                {/* {commentDisplay} */}
            </div>
        );
    }
}

export default Comments;
