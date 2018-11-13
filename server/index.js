require("dotenv").config();
const express = require("express"),
  path = require('path'),
  app = express(),
  port = process.env.PORT || 3001,
  massive = require("massive"),
  { json } = require("body-parser"),
  { getPosts,newPost } = require('./Controllers/PostsController');

app.use(json());
massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

//-----Endpoints-----
//Posts
// app.get('/api/getPosts',getPosts)
app.post('/api/newPost',newPost)



app.listen(port, () => {
  console.log("server is listening on port:", port);
});