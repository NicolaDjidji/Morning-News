var express = require("express");
var router = express.Router();
var UserModel = require("../models/users");
var uid2 = require("uid2");
var bcrypt = require("bcrypt");
const { token } = require("morgan");
// var ArticleModel = require("../models/articles");
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
      articles: {},
    });
    await newUser.save();
    res.json(newUser);
  } else {
    res.json({ result: false });
  }
});
router.post("/newarticle", async function (req, res, next) {
  // 0- envoyer le token a partir de react
  // 1- recup user with token
  // 2- updateOne avec push dans user
<<<<<<< HEAD
  console.log('req.body.img', req.body.img)
  console.log('req.body', req.body)
  let user = await UserModel.findOne({token:req.body.token})
  console.log('user',user)

  var newArticle = {
    title: req.body.title,
    img: req.body.img,
    
    desc: req.body.desc
  }
  var updateArticle = await UserModel.updateOne(
    {_id: user._id}, //filter
    {$articles:[...user.articles, newArticle] 
    
    } // change
  ); 

console.log('updateartic', updateArticle)
  res.json({result: true})  
  });
  
 
=======
  let user = await UserModel.find({ token: req.body.token });
  console.log(user);
  var token = req.body.token;
  var title = req.body.title;
  var desc = req.body.desc;
  var img = req.body.img;
  var updateAericles = UserModel.updateOne(
    { token },
    {
      $push: {
        articles: [
          {
            title: title,
            desc: desc,
            img: img,
          },
        ],
      },
    }
  );
  console.log(token);
  console.log(title);
  console.log(desc);
  console.log(UserModel);
  console.log("update", updateAericles);
  // await newArticle.save();
  res.json({ test: true });
});
>>>>>>> c8456cb2eca382da40442f25b0c43258990d2218
router.post("/deletearticle/:title", async function (req, res, next) {
  await ArticleModel.deleteMany({
    title: req.params.title,
  });
  console.log(req.params.title);
  res.json({ result: true });
});
module.exports = router;
