const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const User = require("../models/user");

// Register
router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    online: req.body.online
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

router.post("/logout", (req, res, next) => {
  User.findByIdAndUpdate(
      req.body.id,
      { $set: { online: false } },
      { new: true },
      function(err, user) {
        if (err) return handleError(err);
        res.json({ success: true, msg: "Logout" })
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
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
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
    User.findByIdAndUpdate(
      req.user._id,
      { $set: { online: true } },
      { new: true },
      function(err, user) {
        if (err) return handleError(err);
        res.json({
          user: {
            name: req.user.name,
            username: req.user.username,
            email: req.user.email,
            id: req.user._id
          }
        });
      }
    );
  }
);


module.exports = router;
