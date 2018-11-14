UPDATE posts
SET title=$2, image_url=$3, web_url=$4, text_content=$5
WHERE post_id=$1
RETURNING *;