module.exports = {
  addNewUser(req, res) {
    const { username, userHash } = req.body
    const db = req.app.get('db')
    // console.log('req.body', req.body)
    db.users
      .checkUserhash([userHash])
      .then(response => {
        if (!response.length) {
          db.users
            .createNewUser([username, userHash])
            .then(response => res.status(200).send(response))
            .catch(err => console.log('err', err))
        } else {
          return res.status(200).send(response)
        }
      })
      .catch(err => console.log('err', err))
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
    const { user_id } = req.session
    const { username } = req.body
    const db = req.app.get('db')
    db.users.editUserName([user_id, username])
    return res
      .sendStatus(200)
      .json('okie dokie')

      .catch(err => console.log('err', err))
  },

  editUserPhoto(req, res) {
    const { user_id } = req.session
    const { user_photo } = req.body
    const db = req.app.get('db')
    db.users
      .editUserPhoto([user_id, user_photo])
      .then(() => {
        return res.sendStatus(200)
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
  },
}
