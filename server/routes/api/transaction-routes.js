const router = require("express").Router();
const transactionControllers = require("../../controllers/transaction-controller");

// Import any controllers needed here
const {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = transactionControllers;

// Declare the routes that point to the controllers above
router.route("/").get(getAllTransactions);
router.route("/").post(createTransaction);

router.route("/:id").get(getTransactionById);
router.route("/:id").put(updateTransaction);
router.route("/:id").delete(deleteTransaction);

module.exports = router;
