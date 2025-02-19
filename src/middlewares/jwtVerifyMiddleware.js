const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

const jwtVerifyMiddleware = async (req, res, next) => {
  
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findOne({ email: decoded?.email });
    req.user = user;
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }

};
module.exports = jwtVerifyMiddleware;
