DELETE FROM posts
WHERE post_id = $1 AND user_id = $2;
SELECT * FROM posts
WHERE user_id = $2;