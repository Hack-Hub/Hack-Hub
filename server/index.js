require('dotenv').config()
const express = require('express'),
  path = require('path'),
  app = express(),
  port = process.env.PORT || 3001,
  massive = require('massive'),
  socketio = require('socket.io'),
  { json } = require('body-parser'),
  { getPosts, newPost } = require('./Controllers/PostsController');

app.use(json())
massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance)
})
const { addNewUser, getLoggedInUserId } = require('./Controllers/UserController')

//-----Endpoints-----
//Posts
// app.get('/api/getPosts',getPosts)
app.post('/api/newPost', newPost)

// Users
app.post('/api/newUser', addNewUser)
app.get('/api/userById', getLoggedInUserId)

const expressServer = app.listen(port, () => {
  console.log("server is listening on port:", port);
});
const io = socketio(expressServer);

io.on('connection', (socket) => {
  socket.emit('welcome message', {data: "Welcome to hackhub chat"})
})


//endpoints
