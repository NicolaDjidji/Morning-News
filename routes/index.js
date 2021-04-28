var express = require("express");
var router = express.Router();
var UserModel = require("../models/users");
/* GET home page. */
router.post("/signin", async function (req, res, next) {
  var searchUser = await UserModel.find({
    email: req.body.email,
    password: req.body.password,
  });
  console.log(searchUser);
  res.json(searchUser);
});
router.post("/newuser", async function (req, res, next) {
  let exist = await UserModel.findOne({ email: req.body.email });
  if (exist === null) {
    var newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.json(newUser);
  } else {
    res.json({ result: false });
  }
});
module.exports = router;
