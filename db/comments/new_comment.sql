INSERT INTO comments (post_id, user_id, comment_text, parent_comment_id, comment_date_time)
VALUES (
-- post_id
$1,
-- user_id
$2, 
--  comment_text
$3, 
--  parent_comment_id
$4,
--  comment_date_time
current_timestamp
);

SELECT * FROM comments 
WHERE post_id = $1;