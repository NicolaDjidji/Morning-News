var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  articles: [articlesSchema]
});
var articlesSchema = mongoose.Schema({
  title: String,
  img: String,
  title: String,
  desc: String,
})

var UserModel = mongoose.model("UsersDB", UserSchema);

module.exports = UserModel;
