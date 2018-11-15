SELECT u.username, m.message_text 
FROM messages AS m 
JOIN users AS u 
ON m.user_id = u.user_id
WHERE subhub_id = $1;