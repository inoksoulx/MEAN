const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const cluster = require("cluster");
const User = require("./models/user");

// Connect To Database

mongoose.connect("mongodb://inok:inok@ds137464.mlab.com:37464/meaninok", {
  useMongoClient: true
});

const users = require("./routes/users");

const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http, { transports: ["websocket", "polling"] });

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

let usersOnline = {};

io.on("connection", function(socket) {
  socket.on("online", function(id) {
    if (id in usersOnline) {
      return false;
    } else {
      socket.id = id;
      usersOnline[socket.id] = socket;

      User.findByIdAndUpdate(
        id,
        { $set: { online: true } },
        { new: true },
        function(err, user) {
          if (err) console.log(err);;
        }
      );
    }
  });

  function updateOnline() {
    User.find((err, users) => {
      if (err) console.log(err);
      io.sockets.emit("onlineUsers", '123');
      console.log(users);
    });
  }

  socket.on("disconnect", function() {
    if (!socket.id) return;
    User.findByIdAndUpdate(
      usersOnline[socket.id],
      { $set: { online: false } },
      { new: true },
      function(err, user) {
        if (err) console.log(err);;
        updateOnline();
      }
    );
  });
});

// Start Server
http.listen(port, function() {
  console.log("listening on *:8080");
});
