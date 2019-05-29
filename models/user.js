const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//S C H E M A   S E T U P
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
