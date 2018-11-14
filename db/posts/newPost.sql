INSERT INTO posts(user_id,subhub_id,votes,title,image_url,text_content,post_date_time)
VALUES(
-- user_id
$1,
-- subhub_id
$2,
-- votes
$3,
-- title
$4,
-- image_url
$5,
-- text_content
$6,
-- post_date_time
current_timestamp
)
RETURNING *;