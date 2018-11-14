const getAllSubhubs = (req, res) => {
  const db = req.app.get('db')
  db.searchbar.getSubhubs().then(response => {
    console.log('response', response)
    res.status(200).json(response)
  })
}

const getAllPosts = (req, res) => {
  const db = req.app.get('db')
  db.searchbar.getPosts().then(response => {
    res.status(200).json(response)
  })
}

module.exports = {
  getAllSubhubs,
  getAllPosts,
}
