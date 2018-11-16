require('dotenv').config()
const express = require('express'),
  // path = require('path'),
  app = express(),
  port = process.env.PORT || 3001,
  massive = require('massive'),
  socketio = require('socket.io'),
  { json } = require('body-parser'),
  {
    getPosts,
    newPost,
    editPost,
    deletePost,
    getPostsBySub,
    getPostByID
  } = require('./Controllers/PostsController'),
  {
    postUpVote,
    postDownVote,
    // updatePostVote,
    // getPostVoteScore,
  } = require('./Controllers/VotesController'),
  { getMessages, newMessage } = require('./Controllers/MessagesController'),
  {
    getComments,
    newComment,
    editComment,
    deleteComment,
  } = require('./Controllers/CommentsController'),
  { getSub, getSubByName, newSub, editSub, deleteSub } = require('./Controllers/SubhubController'),
  {
    addNewUser,
    getCurrentUser,
    editUserName,
    editUserPhoto,
  } = require('./Controllers/UserController'),
  { getUserSubs, addFollow, deleteFollow } = require('./Controllers/FollowedSubsController'),
  { getAllSubhubs, getAllPosts } = require('./Controllers/SearchbarController'),
  session = require('express-session')

app.use(json())
massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance)
})

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000000,
    },
  })
)

//-----Endpoints-----
//Posts
app.get('/api/getPosts/', getPosts)
app.get('/api/getSubPosts/:subhub_id', getPostsBySub)
app.get('/api/getPostByID/:post_id', getPostByID)
app.post('/api/newPost', newPost)
app.put('/api/editPost:id', editPost)
app.delete('/api/deletePost/:id', deletePost)

// Votes
app.post('/api/postUpVote', postUpVote)
app.post('/api/postDownVote', postDownVote)

//Comments
app.get('/api/getComments/:post_id', getComments)
app.post('/api/newComment', newComment)
app.put('/api/editComment:comment_id', editComment)
app.delete('/api/deleteComment/:comment_id', deleteComment)

//Messages
app.get('/api/getMessages/:subhub_id', getMessages)
app.post('/api/newMessage', newMessage)

//Subhubs
app.get('/api/getSub/:subhub_id', getSub)
app.get('/api/getSubByName/',getSubByName)
app.post('/api/newSub', newSub)
app.put('/api/editSub/:subhub_id', editSub)
app.delete('/api/deleteSub/:subhub_id', deleteSub)

//Followed Subhubs
app.get('/api/getUserSubs', getUserSubs)
app.post('/api/addFollow', addFollow)
app.delete('/api/deleteFollow/:userId/:subhubId', deleteFollow)

// Users
app.post('/api/newUser', addNewUser)
app.post('/api/userSession', (req, res) => {
  req.session.user_id = req.body.user_id
  req.session.save()
})
app.post('/api/destroySession', (req, res) => {
  // req.session.user_id = req.body.user_id
  req.session.destroy()
})
app.get('/api/currentUser', getCurrentUser)
app.put('/api/editUserName/:userId', editUserName)
app.put('/api/editUserPhoto/:userId', editUserPhoto)

// Searchbar
app.get('/api/getAllSubhubs', getAllSubhubs)
app.get('/api/getAllPosts', getAllPosts)

const expressServer = app.listen(port, () => {
  console.log('server is listening on port:', port)
})

const io = socketio(expressServer)

io.on('connection', socket => {
  socket.on('room', data => {
    socket.join(data.room)
  })

  socket.on('send_message', data => {
    io.in(data.room).emit('message', {
      username: data.username,
      message_text: data.message_text,
    })
  })

  socket.on('disconnect', () => {})
})
