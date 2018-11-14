SELECT p.votes FROM posts p
JOIN votes v on v.post_id = p.post_id
WHERE v.vote_status = -1 AND p.post_id = $1;