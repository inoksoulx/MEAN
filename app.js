const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const cluster = require("cluster");

// Connect To Database

mongoose.connect("mongodb://inok:inok@ds137464.mlab.com:37464/meaninok", {
  useMongoClient: true
});

const users = require("./routes/users");

const app = express();

const http = require("http").Server(app);
const io = require('socket.io')(http, {'transports': ['websocket', 'polling']});



// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

// Index Route
app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

io.on("connection", function(socket) {
  socket.on("online", function(user) {
    io.emit("online", user);
  });
  socket.on("disconnect", function(user) {
    console.log("user disconnected" + user);
  });
});



// Start Server
http.listen(port, function() {
  console.log("listening on *:8080");
});
