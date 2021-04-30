var express = require("express");
var router = express.Router();
var UserModel = require("../models/users");
var uid2 = require("uid2");
var bcrypt = require("bcrypt");
/* GET home page. */
router.post("/signin", async function (req, res, next) {
  // var searchUser = await UserModel.find({
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  let exist = await UserModel.findOne({ email: req.body.email });
  console.log(exist);
  // console.log(req.body.password, searchUser.password);

  if (bcrypt.compareSync(req.body.password, exist.password)) {
    console.log("hash success");
    console.log(exist);
    res.json([exist]);
  } else {
    res.json({ error: "e" });
  }
});
router.post("/newuser", async function (req, res, next) {
  let exist = await UserModel.findOne({ email: req.body.email });
  console.log(exist);
  if (exist === null) {
    var hash = bcrypt.hashSync(req.body.password, 10);
    var newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token: uid2(32),
    });
    await newUser.save();
    res.json(newUser);
  } else {
    res.json({ result: false });
  }
});
router.post("/newarticle", async function (req, res, next) {
  var newArticle = new ArticleModel({
    img: req.body.img,
    title: req.body.title,
    desc: req.body.desc,
  });
  await newArticle.save();
  res.json(newArticle);
});
router.post("/deletearticle/:title", async function (req, res, next) {
  await ArticleModel.deleteMany({
    title: req.params.title,
  });
  console.log(req.params.title);
  res.json({ result: true });
});
module.exports = router;
