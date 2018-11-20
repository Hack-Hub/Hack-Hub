module.exports = {
  getUserSubs(req, res) {
    const db = req.app.get('db')
    const { user_id } = req.session
    db.followed
      .get_user_subs(user_id)
      .then(subs => {
        return res.status(200).json(subs)
      })
      .catch(err => console.log('err', err))
  },
  addFollow(req, res) {
    const db = req.app.get('db')
    db.followed
      .add_follow([req.body.subhubId, req.body.userId])
      .then(response => {
        return res.status(200).json(response)
      })
      .catch(err => console.log('err', err))
  },
  deleteFollow(req, res) {
    const { userId, subhubId } = req.params
    const db = req.app.get('db')
    db.followed
      .delete_follow([userId, subhubId])
      .then(() => {
        return res.status(200)
      })
      .catch(err => console.log('err', err))
  },
}
