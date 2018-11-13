const addNewUser = (req, res) => {
  const { authId, username } = req.body
  // console.log('req.body', req.body)
  const db = req.app.get('db')
  db.users.createNewUser([authId, username]).catch(err => console.log('err', err))
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
