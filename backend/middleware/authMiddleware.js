const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }
    
    if (!token) return res.status(401).json("No token");

    const decoded = jwt.verify(token, "secret");
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json("Token is not valid");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json("Access denied: Admin only");
  }
};