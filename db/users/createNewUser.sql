INSERT INTO users(username, userhash, user_photo)
VALUES ($1, $2, 'https://i.imgur.com/xl83oYL.jpg')
RETURNING *;