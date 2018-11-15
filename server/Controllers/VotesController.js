module.exports = {
  postUpVote(req, res) {
    const { postId, userId } = req.body
    const db = req.app.get('db')
    //check if user already voted on a post
    db.post_votes.p_getVotes([postId, userId]).then(response => {
      //if user already voted then delete or update vote depending on selection
      if (response.length) {
        if (response[0].vote_status === 1) {
          db.post_votes.p_deleteUpVote([response[0].vote_id,postId]).then(() => {
            res.sendStatus(200)
          })
        } else {
          db.post_votes.p_updateToUpVote([response[0].vote_id,postId]).then(() => {
            res.sendStatus(200)
          })
        }
        //if user did not vote yet then add new vote
      } else {
        db.post_votes.p_postUpVote([postId, userId]).then(() => {
          res.sendStatus(200)
        })
      }
    })
  },
  postDownVote(req, res) {
    const { postId, userId } = req.body
    const db = req.app.get('db')
    //check if user already voted on a post
    db.post_votes.p_getVotes([postId, userId]).then(response => {
      //if user already voted then delete or update vote depending on selection
      if (response.length) {
        if (response[0].vote_status === -1) {
          db.post_votes.p_deleteDownVote([response[0].vote_id,postId]).then(() => {
            res.sendStatus(200)
          })
        } else {
          db.post_votes.p_updateToDownVote([response[0].vote_id,postId]).then(() => {
            res.sendStatus(200)
          })
        }
        //if user did not vote yet then add new vote
      } else {
        db.post_votes.p_postDownVotes([postId, userId]).then(() => {
          res.sendStatus(200)
        })
      }
    })
  },
}
