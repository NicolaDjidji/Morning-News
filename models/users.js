var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  // articles: [
  //   {
  //     img: String,
  //     title: String,
  //     desc: String,
  //   },
  // ],
});

var MoviesModel = mongoose.model("UsersDB", UserSchema);

module.exports = MoviesModel;
