const { Wallet } = require("../models");
const { Transaction } = require("../models");
const { User } = require("../models");

// Create a new wallet
const createWallet = async (req, res) => {
  try {
    const { name, balance, user } = req.body;

    const newWallet = await Wallet.create({
      name,
      balance,
      user,
    });

    res.status(200).json(newWallet);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// Get all wallets
const getAllWalletsByUserId = async (req, res) => {
  try {
    const allWallets = await Wallet.find({
      user: req.params.user_id,
    }).populate("user");

    res.status(200).json(allWallets);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get a single wallet
const getSingleWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ _id: req.params.id }).populate({
      path: "transactions",
    });

    if (!wallet) {
      res.status(500).json({ message: "No wallet found with this id!" });
    } else {
      res.status(200).json(wallet);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Update a wallet
const updateWallet = async (req, res) => {
  try {
    const updatedWallet = await Wallet.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { runValidators: true, new: true }
    );

    res.status(200).json(updatedWallet);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Delete a wallet
const deleteWallet = async (req, res) => {
  try {
    const deletedWallet = await Wallet.findOneAndDelete({
      _id: req.params.id,
    });

    res.status(200).json(deletedWallet);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  createWallet,
  getAllWalletsByUserId,
  getSingleWallet,
  updateWallet,
  deleteWallet,
};
