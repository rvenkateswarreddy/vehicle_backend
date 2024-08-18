const jwt = require("jsonwebtoken");

// Admin Authentication Middleware
exports.adminAuth = function (req, res, next) {
  const token = req.header("x-auth-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Student Authentication Middleware
exports.userAuth = function (req, res, next) {
  const token = req.header("y-auth-token");
  console.log(token);
  console.log("the nbes toekn venktes", token);
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    console.log("Token:", token); // Log the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Payload:", decoded); // Log the decoded payload

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("JWT Error:", err); // Log the error
    res.status(401).json({ msg: "Token is not valid" });
  }
};
