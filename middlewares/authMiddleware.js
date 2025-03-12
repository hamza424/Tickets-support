const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  console.log("📌 Checking authentication...");

  const token = req.cookies?.token;
  console.log("📌 Token received:", token);

  if (!token) {
    console.log("❌ No token found. Redirecting to login...");
    return res.redirect("/login");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("❌ JWT Verification failed:", err);
      return res.redirect("/login");
    }
    console.log("✅ Authenticated user:", user);
    req.user = user;
    next();
  });
};

const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    console.log("❌ Unauthorized access attempt. Redirecting...");
    return res.redirect("/unauthorized");
  }
  next();
};

module.exports = { authenticateJWT, authorizeRole };
