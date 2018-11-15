--update post with new vote total
UPDATE posts
SET votes = votes + 1
WHERE post_id = $1;
--update votes table with vote status and user
INSERT INTO votes(vote_status, post_id, user_id)
VALUES(1, $1, $2)
RETURNING *;