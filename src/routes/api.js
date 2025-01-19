const router = require("express").Router();
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");

// auth routes
router.post("/jwt", loginController.login);
// user routes
router.get("/users", userController.getAllUser);
router.post("/users", userController.createNewUser);

module.exports = router;
