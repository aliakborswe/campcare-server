const router = require("express").Router();
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const jwtVerifyMiddleware = require("../middlewares/jwtVerifyMiddleware");
const checkPermission = require("../middlewares/checkPermission");
const userRoleController = require("../controllers/getUserRole");
const campController = require("../controllers/campController");
const participantController = require("../controllers/participantController");
const paymentController = require("../controllers/paymentController")
const feedbackController = require("../controllers/feedbackController")

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
router.put(
  "/camps/:id",
  jwtVerifyMiddleware,
  checkPermission("admin"),
  campController.updateCampById
);
router.delete(
  "/camps/:id",
  jwtVerifyMiddleware,
  checkPermission("admin"),
  campController.deleteCampById
);
router.get("/topcamps", campController.getTop6Camps);
router.get("/camps-length", campController.getCampLength);

// participant routes
router.get(
  "/registered-camps",
  jwtVerifyMiddleware,
  participantController.getAllParticipantByEmail
);
router.get(
  "/participants/:participantId",
  jwtVerifyMiddleware,
  participantController.getParticipantById
);
router.get(
  "/participants",
  jwtVerifyMiddleware,
  checkPermission("admin"),
  participantController.getAllParticipant
);
router.post(
  "/participants",
  jwtVerifyMiddleware,
  participantController.createNewParticipant
);
router.patch(
  "/participants/:id",
  jwtVerifyMiddleware,
  checkPermission("admin"),
  participantController.updateConfirmationStatusById
);
router.delete(
  "/participants/:id",
  jwtVerifyMiddleware,
  participantController.deleteParticipantById
);
router.get("/participants-length", participantController.getParticipantLength);

// payment related api
router.post(
  "/payment-intent",
  jwtVerifyMiddleware,
  paymentController.paymentIntentFunc
);

router.patch(
  "/payment-confirmation",
  jwtVerifyMiddleware,
  paymentController.paymentConfirmationFunc
);

router.get(
  "/payment-history",
  jwtVerifyMiddleware,
  paymentController.getPaymentHistoryByEmail
);

// feedback route
router.get("/feedback", feedbackController.getAllFeedback);
router.post("/feedback", feedbackController.createFeedback);

module.exports = router;
