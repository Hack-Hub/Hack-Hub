const addNewUser = (req, res) => {
  const { userClientId, username } = req.body
  const db = req.app.get('db')
  console.log('req.body', req.body)
  db.users.checkUsername([username]).then(response => {
    console.log('response', response)
    if (!response.length) {
      db.users.createNewUser([userClientId, username]).catch(err => console.log('err', err))
    }
  })
  return res.status(200).send('okie dokie')
}

const getLoggedInUserId = (req, res) => {
  console.log('req.params', req.params)
  const db = req.app.get('db')

  db.users
    .getUserID(req.params.user_id)
    .then(response => {
      console.log('response', response)
      return res.status(200).json(response)
    })
    .catch(err => console.log('err', err))
}

module.exports = {
  addNewUser,
  getLoggedInUserId,
}
