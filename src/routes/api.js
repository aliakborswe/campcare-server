const userController = require("../controllers/userController");
const router = require("express").Router();

// user routes
router.get("/users", userController.getAllUser);

module.exports = router;
