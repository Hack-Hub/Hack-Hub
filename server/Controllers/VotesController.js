module.exports = {
  postUpVote(req, res) {
    const { postId, userId } = req.body
    // const { userId } = req.session
    const db = req.app.get('db')
    db.post_votes.p_getVotes([postId, userId]).then(response => {
      // console.log('postId, userId', postId, userId)
      // console.log('response', response)
      if (response.length) {
        // console.log('response', response)
        if (response[0].vote_status === 1) {
          db.post_votes.p_deleteVote([response[0].vote_id]).then(() => {
            res.sendStatus(200)
          })
        } else {
          db.post_votes.p_updateToUpVote([response[0].vote_id]).then(() => {
            res.sendStatus(200)
          })
        }
      } else {
        db.post_votes.p_postUpVote([postId, userId]).then(() => {
          res.sendStatus(200)
        })
      }
    })
  },
  postDownVote(req, res) {
    const { postId, userId } = req.body
    // const { userId } = req.session
    const db = req.app.get('db')
    db.post_votes.p_getVotes([postId, userId]).then(response => {
      // console.log('postId, userId', postId, userId)
      // console.log('response', response)
      if (response.length) {
        if (response[0].vote_status === -1) {
          db.post_votes.p_deleteVote([response[0].vote_id]).then(() => {
            res.sendStatus(200)
          })
        } else {
          db.post_votes.p_updateToDownVote([response[0].vote_id]).then(() => {
            res.sendStatus(200)
          })
        }
        // console.log('response', response)
      } else {
        db.post_votes.p_postDownVotes([postId, userId]).then(() => {
          res.sendStatus(200)
        })
      }
    })
  },
}
