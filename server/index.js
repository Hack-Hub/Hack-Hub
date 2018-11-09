require("dotenv").config();
const express = require("express"),
  path = require('path'),
  app = express(),
  port = process.env.PORT || 3001,
  massive = require("massive"),
  { json } = require("body-parser");

app.use(json());
massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

app.listen(port, () => {
  console.log("server is listening on port:", port);
});
//endpoints
