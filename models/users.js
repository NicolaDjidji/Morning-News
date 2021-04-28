var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

var MoviesModel = mongoose.model("UsersDB", UserSchema);

module.exports = MoviesModel;
