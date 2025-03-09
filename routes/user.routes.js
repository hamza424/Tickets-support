const express = require("express");
const router = express.Router();
const userController = require("../controllers/User.controller"); // Adjust the path if needed

router.post("/register", userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
