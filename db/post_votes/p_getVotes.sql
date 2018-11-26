SELECT v.vote_id, v.vote_status, p.votes FROM votes v
JOIN posts p ON p.post_id = v.post_id
WHERE v.post_id = $1 AND v.user_id = $2;