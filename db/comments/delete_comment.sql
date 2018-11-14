DELETE FROM comments 
WHERE comment_id = $1;

SELECT * FROM comments 
WHERE post_id = $2;