module.exports={
    getComments(req,res){
        let db=req.app.get('db');
        db.comments.get_comments(req.params.post_id).then(comments => {
            return res.status(200).json(comments);
        })
    },
    newComment(req,res){
        let db=req.app.get('db');
        const {post_id, user_id, comment_text, comment_date_time, parent_comment_id} = req.body;
        db.comments.new_comment([post_id, user_id, comment_text, comment_date_time, parent_comment_id]).then(comments => {
            return res.status(200).json(comments);
        })
    },
    editComment(req,res){
        let db=req.app.get('db');
        db.comments.edit_comment([req.params.comment_id, req.body.post_id, comment_text]).then(comments => {
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