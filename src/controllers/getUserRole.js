const userModel = require("../models/UserModel");

//  get user role
exports.getUserRole = async (req, res) => {
  try {
    res.send(req.user.role);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};