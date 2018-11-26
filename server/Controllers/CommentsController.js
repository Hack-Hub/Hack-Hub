module.exports={
    getComments(req,res){
        let db=req.app.get('db');
        const {post_id} = req.params;
        db.comments.get_comments(post_id).then(comments => {
            return res.status(200).json(comments);
        })
    },
    newComment(req,res){
        let db=req.app.get('db');
        const {post_id, comment_text, parent_comment_id} = req.body;
        const {user_id} = req.session;
        db.comments.new_comment([post_id, user_id, comment_text, parent_comment_id]).then(comments => {
            return res.status(200).json(comments);
        })
    },
    editComment(req,res){
        let db=req.app.get('db');
        db.comments.edit_comment([req.params.comment_id, req.body.post_id, req.body.comment_text]).then(comments => {
            return res.status(200).json(comments);
        })
    },
    deleteComment(req,res){
        let db=req.app.get('db');
        db.comments.delete_comment([req.params.comment_id, req.body.post_id]).then(comments => {
            return res.status(200).json(comments);
        })     
    }
}