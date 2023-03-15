const router = require("express").Router();
const walletControllers = require("../../controllers/wallet-controller");

// Import any controllers needed here
const {
  createWallet,
  getAllWalletsByUserId,
  getSingleWallet,
  updateWallet,
  deleteWallet,
} = walletControllers;

router.route("/:user_id").get(getAllWalletsByUserId);
router.route("/").post(createWallet);

module.exports = router;
