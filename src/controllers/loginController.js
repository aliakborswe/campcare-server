const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

exports.login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await userModel.findOne({ email }).exec();
    if (user) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.send({ token });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
