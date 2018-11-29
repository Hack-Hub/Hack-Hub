INSERT INTO posts(user_id,subhub_id,title,image_url,web_url,text_content,video_url,code,post_date_time,votes)
VALUES(
-- user_id
$1,
-- subhub_id
$2,
-- title
$3,
-- image_url
$4,
--web_url
$5,
-- text_content
$6,
--video_url
$7,
--code
$8,
-- post_date_time
current_timestamp,
-- votes initial value starts at 0
0
)
RETURNING *;