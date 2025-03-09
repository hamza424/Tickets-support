const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  authorizeRole,
} = require("../middlewares/authMiddleware");

router.get("/admin", authenticateJWT, authorizeRole("admin"), (req, res) =>
  res.render("admin")
);
router.get(
  "/support_agent",
  authenticateJWT,
  authorizeRole("support_agent"),
  (req, res) => res.render("support")
);
router.get("/user", authenticateJWT, authorizeRole("user"), (req, res) =>
  res.render("user")
);

router.get("/unauthorized", (req, res) => res.render("unauthorized"));

module.exports = router;
