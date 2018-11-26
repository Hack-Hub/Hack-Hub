INSERT INTO users(username,user_photo)
VALUES ($1, 'https://i.imgur.com/xl83oYL.jpg')
RETURNING *;