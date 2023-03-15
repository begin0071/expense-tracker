const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");

const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  wallet: {
    type: Schema.Types.ObjectId,
    ref: "Wallet",
  },
});

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
