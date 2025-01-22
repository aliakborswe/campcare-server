const router = require("express").Router();
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const jwtVerifyMiddleware = require("../middlewares/jwtVerifyMiddleware");
const checkPermission = require("../middlewares/checkPermission");
const userRoleController = require("../controllers/getUserRole");
const campController = require("../controllers/campController");
const participantController = require("../controllers/participantController");

// auth routes
router.post("/jwt", loginController.login);

// get user role
router.get("/role", jwtVerifyMiddleware, userRoleController.getUserRole);

// user routes
router.get(
  "/users",
  jwtVerifyMiddleware,
  checkPermission("admin"),
  userController.getAllUser
);
router.get("/users/:email", jwtVerifyMiddleware, userController.getUserByEmail);
router.post("/users", userController.createNewUser);
router.put("/users/:id", jwtVerifyMiddleware, userController.updateUserById);

// camp routes
router.get("/top-camps", campController.getTop6Camps);
router.get("/camps/:id", campController.getCampById);
router.get("/camps", campController.getAllCamp);
router.post(
  "/camps",
  jwtVerifyMiddleware,
  checkPermission("admin"),
  campController.createCamp
);

// participant routes
router.post(
  "/participants",
  jwtVerifyMiddleware,
  participantController.createNewParticipant
);

module.exports = router;
