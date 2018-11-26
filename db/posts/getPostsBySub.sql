SELECT p.*, s.sh_name, u.*
FROM posts p
JOIN subhubs s ON s.subhub_id = p.subhub_id
JOIN users u ON u.user_id = p.user_id
WHERE p.subhub_id = $1;
