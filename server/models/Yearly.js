const { Schema, model } = require("mongoose");

const yearlySchema = new Schema({
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

  yearly_Savings: {
    type: Number,
    required: true,
  },
  yearly_Balance: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Yearly = model("Yearly", yearlySchema);
module.exports = Yearly;
