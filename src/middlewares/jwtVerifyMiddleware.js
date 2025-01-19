const jwt = require("jsonwebtoken");

const jwtVerifyMiddleware = async (req, res, next) => {
  
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }

};
module.exports = jwtVerifyMiddleware;
