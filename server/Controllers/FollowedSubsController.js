module.exports = {
  getUserSubs(req, res) {
    const db = req.app.get('db')
    db.followed.get_user_subs(req.params.user_id).then(subs => {
      return res.status(200).json(subs)
    })
  },
  addFollow(req, res) {
    const db = req.app.get('db')
    db.followed.add_follow([req.body.subhubId, req.body.userId]).then(response => {
      return res.status(200).json(response)
    })
  },
  deleteFollow(req, res) {
    console.log('req.params', req.params)
    const { userId, subhubId } = req.params
    // const { subhubId } = req.body
    const db = req.app.get('db')
    db.followed
      .delete_follow([userId, subhubId])
      .then(() => {
        return res.status(200)
      })
      .catch(err => console.log('err', err))
  },
}
