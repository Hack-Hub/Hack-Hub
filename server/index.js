require("dotenv").config();
const express = require("express"),
  path = require('path'),
  app = express(),
  port = process.env.PORT || 3001,
  massive = require("massive"),
  { json } = require("body-parser");
  socketio = require('socket.io');

app.use(json());
massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

const expressServer = app.listen(port, () => {
  console.log("server is listening on port:", port);
});
const io = socketio(expressServer);

io.on('connection', (socket) => {
  socket.emit('welcome message', {data: "Welcome to hackhub chat"})
})


//endpoints
