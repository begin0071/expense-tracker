const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
  },
});

const User = model("User", userSchema);
module.exports = User;
