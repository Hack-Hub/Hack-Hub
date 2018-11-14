UPDATE comments 
SET comment_text = $3
WHERE comment_id = $1;

SELECT * FROM comments 
WHERE post_id = $2;