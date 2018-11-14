const getPostUpVotes = (req, res) => {
  const db = req.app.get('db')
  db.post_votes
    .p_getUpVotes([req.params.postId])
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

module.exports = {
  getPostUpVotes,
  // getPostDownVotes,
  // postUpVote,
  // postDownVote,
  // updatePostToUpVote,
  // updatePostToDownVote,
}
