module.exports = {
  getUserSubs(req, res) {
    let db = req.app.get('db')
    db.followed.get_user_subs(req.params.user_id).then(subs => {
      return res.status(200).json(subs)
    })
  },
  addFollow(req, res) {
    let db = req.app.get('db')
    db.followed.add_follow([req.body.subhub_id, req.body.user_id])
  },
  deleteFollow(req, res) {
    let db = req.app.get('db')
    db.followed.delete_follow([req.body.subhub_id, req.body.user_id]).then(subs => {
      return res.status(200).json(subs)
    })
  },
}
