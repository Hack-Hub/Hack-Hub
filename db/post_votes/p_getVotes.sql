SELECT vote_id, vote_status FROM votes
WHERE post_id = $1 AND user_id = $2;