const router = require("express").Router();
const sampleRoutes = require("./sample-routes");
const userRoutes = require("./user-routes");
const transactionRoutes = require("./transaction-routes");
const monthlyRoutes = require("./monthly-routes");
const walletRoutes = require("./wallet-routes");

router.use("/sample", sampleRoutes);
router.use("/users", userRoutes);
router.use("/transactions", transactionRoutes);
router.use("/monthly-transactions", monthlyRoutes);
router.use("/wallets", walletRoutes);

module.exports = router;
