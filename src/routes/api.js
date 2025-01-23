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
router.get("/users/:email", jwtVerifyMiddleware, userController.getUserByEmail);
router.get(
  "/users",
  jwtVerifyMiddleware,
  checkPermission("admin"),
  userController.getAllUser
);
router.post("/users", userController.createNewUser);
router.put("/users/:id", jwtVerifyMiddleware, userController.updateUserById);

// camp routes
router.get("/camps/:id", campController.getCampById);
router.get("/camps", campController.getAllCamp);
router.post(
  "/camps",
  jwtVerifyMiddleware,
  checkPermission("admin"),
  campController.createCamp
);
router.get("/topcamps", campController.getTop6Camps);

// participant routes
router.get(
  "/registered-camps",
  jwtVerifyMiddleware,
  participantController.getAllParticipantByEmail
);
router.post(
  "/participants",
  jwtVerifyMiddleware,
  participantController.createNewParticipant
);
router.delete(
  "/participants/:id",
  jwtVerifyMiddleware,
  participantController.deleteParticipantById
);

module.exports = router;
