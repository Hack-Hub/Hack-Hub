DELETE FROM followed_subhubs
WHERE user_id=$1 AND subhub_id=$2;