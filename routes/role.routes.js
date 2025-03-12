const express = require("express");
const Ticket = require("../models/Ticket");
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
// router.get(
//   "/user",
//   authenticateJWT,
//   authorizeRole("user"),
//   async (req, res) => {
//     try {
//       const user = req.user; // Make sure req.user is set from authentication middleware
//       const tickets = await Ticket.find({ user: user._id }); // Fetch user's tickets
//       res.render("user", { user, tickets }); // Pass user and tickets to EJS
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Server Error");
//     }
//   }
// );

router.get("/user", authenticateJWT, authorizeRole("user"), (req, res) => {
  res.redirect("/tickets");
});


router.get("/unauthorized", (req, res) => res.render("unauthorized"));

module.exports = router;
