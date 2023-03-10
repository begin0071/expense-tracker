// Create transaction controller
// Create a new file in the controllers folder called transaction-controller.js

const { Schema } = require("mongoose");
const { Transaction } = require("../models");
const { User } = require("../models");

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, description, type, date, user } = req.body;

    // find existing user
    const existingUser = await User.findById(user);

    console.log("existingUser", existingUser);

    if (!existingUser) {
      res.status(500).json({ message: "No user found with this id!" });
      return;
    }

    // check if user has enough balance
    if (type === "Expense" && existingUser.balance < amount) {
      res.status(500).json({ message: "Not enough balance!" });
      return;
    }

    const newTransaction = await Transaction.create({
      amount,
      description,
      type,
      date,
      user,
    });

    const updateUser = await User.updateOne(
      { _id: user },
      {
        $inc: {
          balance:
            req.body.type === "Expense" ? -req.body.amount : req.body.amount,
        },
      },
      { new: true }
    );

    res.status(200).json(newTransaction);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await Transaction.find({}).populate("user");

    res.status(200).json(allTransactions);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get one transaction
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate(
      "user"
    );

    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
    });

    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
