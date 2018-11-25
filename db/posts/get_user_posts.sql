-- SELECT * FROM posts
-- WHERE user_id = $1;

SELECT p.*, s.sh_name, u.*
FROM posts p
INNER JOIN subhubs s ON s.subhub_id = p.subhub_id
INNER JOIN users u ON u.user_id = p.user_id
WHERE p.user_id = $1;