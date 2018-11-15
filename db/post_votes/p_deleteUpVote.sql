
DELETE FROM votes
WHERE vote_id = $1;
--update total votes
UPDATE posts
SET votes = votes - 1
WHERE post_id = $2;