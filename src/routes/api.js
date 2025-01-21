const router = require("express").Router();
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const jwtVerifyMiddleware = require("../middlewares/jwtVerifyMiddleware");
const checkPermission = require("../middlewares/checkPermission");
const userRoleController = require("../controllers/getUserRole");
const campController = require("../controllers/campController");

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
router.get("/users/:email",jwtVerifyMiddleware, userController.getUserByEmail);
router.post("/users", userController.createNewUser);

// admin routes

// camp routes
router.post(
  "/camps",
  jwtVerifyMiddleware,
  checkPermission("admin"),
  campController.createCamp
);



module.exports = router;
