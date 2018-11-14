UPDATE votes
SET votes_status= -1
WHERE post_id = $1 AND user_id = $2

RETURNING*;