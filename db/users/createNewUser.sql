INSERT INTO users(auth_id,username,user_photo)
VALUES ($1, $2, 'http://i63.tinypic.com/208h4km.jpg')
RETURNING *;