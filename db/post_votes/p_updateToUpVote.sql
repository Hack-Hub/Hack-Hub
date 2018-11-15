UPDATE votes
SET vote_status= 1
WHERE vote_id = $1 

RETURNING*;
--update total votes
UPDATE posts
SET votes = votes + 2
WHERE post_id = $2;