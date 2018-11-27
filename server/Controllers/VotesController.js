module.exports = {
  postUpVote(req, res) {
    const { post_id } = req.body
    const { user_id } = req.session
    const db = req.app.get('db')
    //check if user already voted on a post
    db.post_votes.p_getVotes([post_id, user_id]).then(response => {
      //if user already voted then delete or update vote depending on selection
      if (response.length) {
        if (response[0].vote_status === 1) {
          db.post_votes.p_deleteUpVote([response[0].vote_id, post_id]).then(() => {
            res.sendStatus(200)
          })
        } else {
          db.post_votes.p_updateToUpVote([response[0].vote_id, post_id]).then(() => {
            res.sendStatus(200)
          })
        }
        //if user did not vote yet then add new vote
      } else {
        db.post_votes.p_postUpVote([post_id, user_id]).then(() => {
          res.sendStatus(200)
        })
      }
    })
  },
  postDownVote(req, res) {
    const { post_id } = req.body
    const { user_id } = req.session
    const db = req.app.get('db')
    //check if user already voted on a post
    db.post_votes.p_getVotes([post_id, user_id]).then(response => {
      //if user already voted then delete or update vote depending on selection
      if (response.length) {
        if (response[0].vote_status === -1) {
          db.post_votes.p_deleteDownVote([response[0].vote_id, post_id]).then(() => {
            res.sendStatus(200)
          })
        } else {
          db.post_votes.p_updateToDownVote([response[0].vote_id, post_id]).then(() => {
            res.sendStatus(200)
          })
        }
        //if user did not vote yet then add new vote
      } else {
        db.post_votes.p_postDownVote([post_id, user_id]).then(() => {
          res.sendStatus(200)
        })
      }
    })
  },
  getVotes(req, res) {
    const { id } = req.params
    const { user_id } = req.session
    const db = req.app.get('db')
    db.post_votes.p_getVotes([id, user_id]).then(response => {
      if (response.length) {
        res.status(200).send(response)
      } else {
        db.post_votes.p_getScore(id).then(response => {
          res.status(200).send(response)
        })
      }
    })
  },
}
