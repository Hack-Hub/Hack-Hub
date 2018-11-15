SELECT * FROM subhubs;


-- SELECT s.sh_banner, s.sh_desc, s.sh_icon, s.sh_name, s.subhub_id, s.theme_color, f.subhub_id, f.user_id, u.user_id
-- FROM followed_subhubs f
-- INNER JOIN subhubs s ON s.subhub_id = f.subhub_id 
-- INNER JOIN users u ON u.user_id = f.user_id 
-- -- TODO!!! CHANGE 1 TO $1 ONCE USER SESSIONS IS RUNNING
-- WHERE f.user_id = 1;

