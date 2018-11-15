module.exports = {
  getUserSubs(req, res) {
    const db = req.app.get('db')
    db.followed.get_user_subs(req.params.user_id).then(subs => {
      return res.status(200).json(subs)
    })
  },
  addFollow(req, res) {
    const db = req.app.get('db')
    db.followed.add_follow([req.body.subhub_id, req.body.user_id])
  },
  deleteFollow(req, res) {
    const { userId } = req.params
    const db = req.app.get('db')
    db.followed
      .delete_follow([userId])
      .then(() => {
        return res.sendStatus(200)
      })
      .catch(err => console.log('err', err))
  },
}
