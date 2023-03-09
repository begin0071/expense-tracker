const router = require("express").Router();
const sampleRoutes = require("./sample-routes");
const userRoutes = require("./user-routes");
const transactionRoutes = require("./transaction-routes");

router.use("/sample", sampleRoutes);
router.use("/users", userRoutes);
router.use("/transactions", transactionRoutes);

module.exports = router;
