SELECT v.vote_status, v.post_id, v.user_id, v.vote_id FROM votes v
INNER JOIN posts p on p.post_id = v.post_id
INNER JOIN users u on u.user_id = v.user_id
WHERE v.vote_status = 1 AND p.post_id = $1;