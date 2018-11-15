SELECT p.*, s.sh_name 
FROM posts p
JOIN subhubs s ON s.subhub_id = p.subhub_id
WHERE subhub_id = $1;

-- SELECT u.user_id, u.username, u.email
-- FROM users u
-- JOIN offers o
-- ON (u.user_id = o.fromuserid)
-- WHERE touserid = $1;