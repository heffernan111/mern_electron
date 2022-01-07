const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// user register
exports.register = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is already taken",
      });
    }

    const { name, email, password } = req.body;

    let newUser = new User({ name, email, password });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      // res.json({
      //   user: success,
      // });
      res.json({
        message: "registration success!",
      });
    });
  });
};

// user login
exports.login = (req, res) => {
  const { email, password } = req.body;

  //check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email not found.",
      });
    }

    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Credentials incorrect.",
      });
    }

    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user,
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return status(400).json({
        error: "Admin User not found",
      });
    }
    if (user.role !== 1) {
      return res.status(400).json({
        error: "Access denied",
      });
    }
    next();
  });
};
