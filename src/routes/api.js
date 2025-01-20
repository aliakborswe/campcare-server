const router = require("express").Router();
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const jwtVerifyMiddleware = require("../middlewares/jwtVerifyMiddleware");
const checkPermission = require("../middlewares/checkPermission");
const userRoleController = require("../controllers/getUserRole");

// auth routes
router.post("/jwt", loginController.login);
// get user role
router.get("/role", jwtVerifyMiddleware, userRoleController.getUserRole);
// user routes
router.get(
  "/users",
  jwtVerifyMiddleware,
  checkPermission('admin'),
  userController.getAllUser
);
router.post("/users", userController.createNewUser);



module.exports = router;
