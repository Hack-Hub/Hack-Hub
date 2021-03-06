module.exports = {
  newPost(req, res) {
    let db = req.app.get('db')
    const { subhub_id, title, image_url, web_url, text_content, video_url, code } = req.body
    const { user_id } = req.session
    db.posts
      .newPost([user_id, subhub_id, title, image_url, web_url, text_content, video_url, code])
      .then(response => {
        return res.status(200).send(response)
      })
  },
  getPosts(req, res) {
    let db = req.app.get('db')
    db.posts.getAllPosts().then(response => {
      return res.status(200).send(response)
    })
  },
  orderPostsByVoteCount(req, res) {
    let db = req.app.get('db')
    db.posts
      .getAllPostsByVoteCount()
      .then(response => {
        return res.status(200).send(response)
      })
      .catch(err => console.log('err', err))
  },
  getPostsBySub(req, res) {
    let db = req.app.get('db')
    const { subhub_id } = req.params
    db.posts.getPostsBySub(subhub_id).then(response => {
      return res.status(200).send(response)
    })
  },
  getPostByID(req, res) {
    let db = req.app.get('db')
    const { post_id } = req.params
    db.posts.getPostByID(post_id).then(response => {
      return res.status(200).send(response)
    })
  },
  editPost(req, res) {
    let db = req.app.get('db')
    const { post_id, title, image_url, web_url, text_content } = req.body
    db.posts.editPost([post_id, title, image_url, web_url, text_content]).then(response => {
      return res.status(200).send(response)
    })
  },
  deletePost(req, res) {
    let db = req.app.get('db')
    const { post_id } = req.params
    const { user_id } = req.session
    db.posts.deletePost([post_id, user_id]).then(response => {
      return res.status(200).send(response)
    })
  },
  getUserPosts(req, res) {
    const db = req.app.get('db')
    const { user_id } = req.session
    db.posts.get_user_posts(user_id).then(posts => {
      return res.status(200).json(posts)
    })
  },
  getUserPosts2(req, res) {
    const db = req.app.get('db')
    db.posts.get_user_posts(req.params.userId).then(posts => {
      return res.status(200).json(posts)
    })
  },
}
