DELETE FROM followed_subhubs
-- WHERE subhub_id=$1
WHERE user_id=$1;

-- SELECT * FROM followed_subhubs
-- JOIN subhubs
-- ON followed_subhubs.subhub_id = subhubs.subhub_id
-- WHERE user_id = $2;