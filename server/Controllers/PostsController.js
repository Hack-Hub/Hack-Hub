module.exports = {
  newPost(req, res) {
    let db = req.app.get('db');
    const { subhub_id, votes, title, image_url, web_url, text_content } = req.body
    const { user_id } = req.session
    db.posts.newPost([user_id, subhub_id, votes, title, image_url, web_url, text_content]).then(response => {
      return res.status(200).send(response)
    })
  },
  getPosts(req, res) {
    let db = req.app.get('db');
    db.posts.getPosts().then(response => {
     return res.status(200).send(response)
    })
  },
  getPostsBySub(req, res) {
    let db = req.app.get('db');
    const { subhub_id } = req.params
    db.posts.getPostsBySub(subhub_id).then(response => {
     return res.status(200).send(response)
    })

  },
  editPost(req, res) {
    let db = req.app.get('db');
    const { post_id, title, image_url, web_url, text_content } = req.body;
    db.posts.editPost([post_id, title, image_url, web_url, text_content]).then(response => {
     return res.status(200).send(response)
    })


  },
  deletePost(req, res) {
    let db = req.app.get('db');
    const { post_id } = req.body;
    db.posts.deletePost(post_id).then(()=>{
     return res.sendStatus(200)
    })
  }
}