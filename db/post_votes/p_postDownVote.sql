INSERT INTO votes(vote_status, post_id, user_id)
VALUES(-1, $1, $2)
RETURNING *;