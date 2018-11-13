module.exports={
    newPost(req,res){
      let db=req.app.get('db');
      const {subhub_id,votes,title,image_url,text_content} = req.body
      const {user_id} = req.session
    //   console.log('req.body:',req.body)
    //   console.log('req.session:',req.session.user_id)
      db.newPost([user_id,subhub_id,votes,title,image_url,text_content]).then(response=>{
      })
    },
    getPosts(req, res){
      let db=req.app.get('db');



    },
    getPostsBySub(req,res){
      let db=req.app.get('db');


    },
    editPost(req, res){
      let db=req.app.get('db');



    },
    deletePost(req, res){
      let db=req.app.get('db');


      
    }
}