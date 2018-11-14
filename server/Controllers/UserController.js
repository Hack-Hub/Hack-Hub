module.exports = {
  addNewUser(req, res) {
    const { userClientId, username } = req.body
    // console.log('req.body', req.body)
    const db = req.app.get('db')
    db.users.createNewUser([userClientId, username]).catch(err => console.log('err', err))
    return res.status(200).send('okie dokie')
  },

  getCurrentUser(req, res) {
    const db = req.app.get('db')
    db.users
      .getUserID(req.session.user_id)
      .then(response => {
        return res.status(200).json(response)
      })
      .catch(err => console.log('err', err))
  },

  editUserName(req, res) {
    const { userId } = req.params
    const { username } = req.body
    const db = req.app.get('db')
    db.users.editUserName([userId, username])
    return res
      .sendStatus(200)
      .json('okie dokie')

      .catch(err => console.log('err', err))
  },

  editUserPhoto(req, res) {
    const { userId } = req.params
    const { user_photo } = req.body
    const db = req.app.get('db')
    db.users
      .editUserPhoto([userId, user_photo])
      .then(() => {
        return res.sendStatus(200).json('okie dokie')
      })
      .catch(err => console.log('err', err))
  },
}
