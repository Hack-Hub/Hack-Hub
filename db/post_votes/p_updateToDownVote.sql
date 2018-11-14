UPDATE votes
SET vote_status= -1
WHERE vote_id = $1 

RETURNING*;