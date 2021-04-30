var mongoose = require("mongoose");

var articlesSchema = mongoose.Schema({
  img: String,
  title: String,
  desc: String,
});


var UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  articles: [articlesSchema]
});


var UserModel = mongoose.model("UsersDB", UserSchema);

module.exports = UserModel;
