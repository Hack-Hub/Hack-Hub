INSERT INTO comments (post_id, user_id, comment_text, comment_date_time, parent_comment_id)
VALUES ($1, $2, $3, $4, $5);

SELECT * FROM comments 
WHERE post_id = $1;