module.exports={
    newPost(req,res){
      let db=req.app.get('db');
      const {user_id,subhub_id,votes,title,image_url,text_content} = req.body
    //   console.log('req.body:',req.body)
      db.newPost([user_id,subhub_id,votes,title,image_url,text_content]).then(response=>{
      })
    }
}