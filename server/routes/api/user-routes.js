const router = require("express").Router();
const userControllers = require("../../controllers/user-controller");

// Import any controllers needed here
const { createUser, updateUser } = userControllers;

// Declare the routes that point to the controllers above
router.route("/").post(createUser);
router.route("/:id").put(updateUser);

module.exports = router;
