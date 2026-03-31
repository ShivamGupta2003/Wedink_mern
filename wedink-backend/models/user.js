const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// passport-local-mongoose adds username, hash, salt + authenticate/serialize methods
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
