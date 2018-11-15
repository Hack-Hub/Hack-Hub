-- SELECT * FROM posts


SELECT p.*, s.sh_name 
FROM posts p
JOIN subhubs s ON s.subhub_id = p.subhub_id;