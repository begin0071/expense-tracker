// Create transaction controller
const { Transaction } = require("../models");
const { User } = require("../models");
const { Wallet } = require("../models");

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, description, type, date, user, wallet } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser) {
      res.status(500).json({ message: "No user found with this id!" });
      return;
    }

    // get wallet balance
    const existingWallet = await Wallet.findById(wallet);

    // check if user has enough balance
    if (type === "expense" && existingWallet.balance < amount) {
      res.status(500).json({ message: "Not enough balance!" });
      return;
    }

    if (
      (type === "income" && amount < 0) ||
      (type === "expense" && amount < 0)
    ) {
      res.status(500).json({ message: "Amount must be positive!" });
      return;
    }

    const newTransaction = await Transaction.create({
      amount,
      description,
      type,
      date,
      user,
    });

    await Wallet.updateOne(
      { _id: wallet },
      { $inc: { balance: type === "income" ? amount : -amount } },
      { runValidators: true, new: true }
    );

    res.status(200).json(newTransaction);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// get all transactions by user id and type then sum the amount and return the object with the total
const getTransactionsByUserId = async (req, res) => {
  try {
    const { userId, type } = req.params;

    const transactions = await Transaction.find({
      user: userId,
      type: type,
    }).populate("user");

    const total = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    res.status(200).json({ transactions, total });
  } catch (err) {
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
    const { amount, description, type, date, user, wallet } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser) {
      res.status(500).json({ message: "No user found with this id!" });
      return;
    }

    const oldTransaction = await Transaction.findById(req.params.id);

    // Calculate the difference between the old and new amount
    const difference = oldTransaction.amount - amount;

    // get wallet balance
    const existingWallet = await Wallet.findById(wallet);

    // check if user has enough balance
    if (type === "expense" && existingWallet.balance < difference) {
      res.status(500).json({ message: "Not enough balance!" });
      return;
    }

    const transaction = await Transaction.updateOne(
      { _id: req.params.id },
      {
        amount,
        description,
        type,
        date,
        user,
      },
      { new: true }
    );

    await Wallet.updateOne(
      { _id: wallet },
      { $inc: { balance: difference } },
      { runValidators: true, new: true }
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

    // update wallet balance after deleting transaction
    await Wallet.updateOne(
      { _id: transaction.wallet },
      { $inc: { balance: transaction.amount } },
      { runValidators: true, new: true }
    );

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
