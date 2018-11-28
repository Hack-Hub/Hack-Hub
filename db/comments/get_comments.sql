-- SELECT * FROM comments 
-- WHERE post_id = $1;

SELECT c.*, u.*
FROM comments c
INNER JOIN users u ON u.user_id = c.user_id
WHERE c.post_id = $1;