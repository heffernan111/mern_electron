const express = require("express");
const route = express.Router();
const {
  register,
  login,
  signout,
  requireSignin,
} = require("../controllers/authControllers");

//import validator
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/authValidator");

//controllers
route.post("/register", userSignupValidator, runValidation, register);
route.post("/login", userSigninValidator, runValidation, login);
route.get("/signout", signout);

// test
route.get("/secret", requireSignin, (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = route;
