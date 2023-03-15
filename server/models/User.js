const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");

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
  createdAt: {
    type: Date,
    default: Date.now,
    get: (value) => dayjs(value).format("MMM DD, YYYY [at] hh:mm a"),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (value) => dayjs(value).format("MMM DD, YYYY [at] hh:mm a"),
  },
});

const User = model("User", userSchema);
module.exports = User;
