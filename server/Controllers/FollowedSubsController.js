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
      .add_follow([req.body.subhubId, req.session.user_id])
      .then(response => {
        return res.status(200).json(response)
      })
      .catch(err => console.log('err', err))
  },
  deleteFollow(req, res) {
    const { subhubId } = req.params
    const { user_id } = req.session
    const db = req.app.get('db')
    db.followed
      .delete_follow([user_id, subhubId])
      .then(() => {
        return res.sendStatus(200)
      })
      .catch(err => console.log('err', err))
  },
  getSubs(req, res) {
    const db = req.app.get('db')
    db.followed
      .get_user_subs(req.params.userId)
      .then(subs => {
        return res.status(200).json(subs)
      })
      .catch(err => console.log('err', err))
  },
}
