INSERT INTO messages (subhub_id, user_id, message_text)
VALUES ($1, $2, $3);

SELECT * FROM messages
WHERE subhub_id = $1;