const router = require("express").Router();
const monthlyControllers = require("../../controllers/monthly-controllers");

// Import any controllers needed here
const { getMonthlyDataById, createMonthly, updateMonthly, deleteMonthly } =
  monthlyControllers;

router.route("/").post(createMonthly);
router.route("/:user_id").get(getMonthlyDataById);
router.route("/:id").put(updateMonthly);
router.route("/:id").delete(deleteMonthly);

module.exports = router;
