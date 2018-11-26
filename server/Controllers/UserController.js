module.exports = {
  addNewUser(req, res) {
    const { username } = req.body
    const db = req.app.get('db')
    // console.log('req.body', req.body)
    db.users.checkUsername([username]).then(response => {
      if (!response.length) {
        db.users
          .createNewUser([username])
          .then(response => res.status(200).send(response))
          .catch(err => console.log('err', err))
      } else {
        return res.status(200).send(response)
      }
    })
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
  getUser(req, res) {
    const db = req.app.get('db')
    db.users
      .getUserID(req.params.user_id)
      .then(response => {
        return res.status(200).json(response)
      })
      .catch(err => console.log('err', err))
  }
}
