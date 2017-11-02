const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const User = require("../models/user");
const multer = require("multer");

// Multer settings

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./public/img/");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadavatar", function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
    } else {
      User.findByIdAndUpdate(
        req.body.id,
        { $set: { avatar: 'img/' + req.file.originalname } },
        { new: true },
        (err, user) => {
          if (err) return handleError(err);
          res.json({ success: true, msg: "Avatar changed." });
        }
      );
    }
  });
});

// Register
router.post("/register", (req, res, next) => {
  let newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    online: req.body.online,
    avatar: "img/camera.png"
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "Failed to register user" });
    } else {
      res.json({ success: true, msg: "User registered" });
    }
  });
});

//Get All
router.post("/allusers", (req, res, next) => {
  User.getAllUsers((err, users) => {
    if (err) {
      res.json({ success: false, msg: "Failed to find users" });
    } else {
      var users = users.filter((element, index, array) => {
        return element._id != req.body.id;
      });
      res.json({ success: true, msg: "Users find", users: users });
    }
  });
});

router.post("/getuser", (req, res, next) => {
  User.findById(req.body.id, (err, user) => {
    if (err) res.send(err);

    res.json({ user });
  });
});

router.post("/logout", (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.id,
    { $set: { online: false } },
    { new: true },
    function(err, user) {
      if (err) return handleError(err);
      res.json({ success: true, msg: "Logout" });
    }
  );
});

// Authenticate
router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(
          {
            name: user.name,
            email: user.email,
            _id: user.id,
            password: user.password
          },
          config.secret,
          {
            expiresIn: 604800 // 1 week
          }
        );
        res.json({
          success: true,
          token: "JWT " + token,
          user: user
        });
      } else {
        return res.json({ success: false, msg: "Wrong password" });
      }
    });
  });
});

// Profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (err) return handleError(err);
    res.json({
      user: {
        username: req.user.username,
        id: req.user._id
      }
    });
  }
);

router.post("/addinfo", (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.id,
    {
      $set: {
        firstname: req.body.firstname,
        surname: req.body.surname,
        lastname: req.body.lastname,
        number: req.body.number,
        info: req.body.info
      }
    },
    { new: true },
    function(err, user) {
      if (err) return handleError(err);
      res.json({ success: true, msg: "Info add" });
    }
  );
});

module.exports = router;
