const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/login", authController.showLogin);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", authController.registerUserr);

module.exports = router;
