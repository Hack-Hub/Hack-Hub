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
    getLoggedInUserId,
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
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000,
    },
  })
)

//-----Endpoints-----
//Posts
app.get('/api/getPosts/:id', getPosts)
app.get('/api/getSubPosts/:id', getPostsBySub)
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
app.get('/api/getUserSubs/:user_id', getUserSubs)
app.post('/api/addFollow', addFollow)
app.delete('/api/deleteFollow/:userId/:subhubId', deleteFollow)

// Users
app.post('/api/newUser', addNewUser)
app.post('/api/userSession', (req, res) => {
  // console.log('req.body', req.body)
  req.session.user_id = req.body.user_id
  console.log('req.session', req.session)
})
app.get('/api/userById/:userId', getLoggedInUserId)
app.put('/api/editUserName/:userId', editUserName)
app.put('/api/editUserPhoto/:userId', editUserPhoto)
// app.delete('/api/deleteUser/:userId', deleteUser)

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

    socket.to(data.room).emit('message', {
      author: 'Server',
      message: `Welcome to ${data.user}`,
    })
  })

  socket.on('disconnect', () => {})
})
