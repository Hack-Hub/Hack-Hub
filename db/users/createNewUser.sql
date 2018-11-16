INSERT INTO users(username,user_photo)
VALUES ($1, 'http://i66.tinypic.com/1zplfyd.jpg')
RETURNING *;