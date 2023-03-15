const { Schema, model } = require("mongoose");

const monthlySchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  transaction_id: { type: Number, required: true },
  Monthly_Savings: {
    type: Number,
    required: true,
  },
  Monthly_Balance: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Monthly = model("Monthly", monthlySchema);
module.exports = Monthly;
