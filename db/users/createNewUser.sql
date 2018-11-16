INSERT INTO users(auth_id,username,user_photo)
VALUES ($1, $2, 'http://i66.tinypic.com/1zplfyd.jpg')
RETURNING *;