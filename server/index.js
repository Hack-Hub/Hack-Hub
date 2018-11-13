require('dotenv').config()
const express = require('express'),
  path = require('path'),
  app = express(),
  port = process.env.PORT || 3001,
  massive = require('massive'),
  socketio = require('socket.io'),
  { json } = require('body-parser'),
  { getPosts, newPost, editPost, deletePost, getPostsBySub } = require('./Controllers/PostsController'),
  { getMessages, newMessage } = require('./Controllers/MessagesController'),
  { getComments, newComment, editComment, deleteComment } = require('./Controllers/CommentsController'),
  { getSub, newSub, editSub, deleteSub, getFollowedById } = require('./Controllers/SubhubController'),
  { addNewUser, getLoggedInUserId, editUser, deleteUser } = require('./Controllers/UserController');


app.use(json())
massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance)
})


//-----Endpoints-----
//Posts
app.get('/api/getPosts/:id', getPosts)
app.get('/api/getSubPosts/:id', getPostsBySub)
app.post('/api/newPost', newPost)
app.put('/api/editPost:id', editPost)
app.delete('/api/deletePost/:id', deletePost)

//Comments
app.get('/api/getComments/:id',  getComments)
app.post('/api/newComment', newComment)
app.put('/api/editComment:id', editComment)
app.delete('/api/deleteComment/:id', deleteComment)

//Messages
app.get('/api/getMessages/:id', getMessages)
app.post('/api/newMessage', newMessage)

//Subhubs
app.get('/api/getSub/:id', getSub)
app.get('/api/getFollowed/:id', getFollowedById)
app.post('/api/newSub', newSub)
app.put('/api/editSub/:id', editSub)
app.delete('/api/deleteSub/:id', deleteSub)

// Users
app.post('/api/newUser', addNewUser)
app.get('/api/userById', getLoggedInUserId)
app.put('/api/editUser/:id', editUser)
app.delete('/api/deleteUser/:id', deleteUser)

const expressServer = app.listen(port, () => {
  console.log("server is listening on port:", port);
});
const io = socketio(expressServer);

io.on('connection', (socket) => {
  socket.on('room', (data) => {
    socket.join(data.room);

    socket.to(data.room).emit('message', {
      author: "Server",
      message: `Welcome to ${data.user}`
    })
  });

  socket.on('disconnect', () => {
    
  })
})


//endpoints
