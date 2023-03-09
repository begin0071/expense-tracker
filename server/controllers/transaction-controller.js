// Create transaction controller
// Create a new file in the controllers folder called transaction-controller.js

const { Transaction } = require("../models");
const { User } = require("../models");

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, description, category, date, user } = req.body;

    const newTransaction = await Transaction.create({
      amount,
      description,
      category,
      date,
      user,
    });

    res.status(200).json(newTransaction);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await Transaction.find({});

    res.status(200).json(allTransactions);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get one transaction
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id });

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
