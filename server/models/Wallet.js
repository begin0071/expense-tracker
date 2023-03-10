// Create a wallet model that has the following fields:
//
//   * name
//   * balance
//   * user
//
// The user field should be a reference to the User model.
//
// Create a wallet controller that has the following functions:
//
//   * createWallet
//   * getAllWallets
//   * getWalletById
//   * updateWallet
//   * deleteWallet
//
// Create a wallet route that has the following routes:
//
//   * GET /api/wallets
//   * GET /api/wallets/:id
//   * POST /api/wallets
//   * PUT /api/wallets/:id
//   * DELETE /api/wallets/:id
//

const { Schema, model } = require("mongoose");

const walletSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Wallet = model("Wallet", walletSchema);
module.exports = Wallet;
