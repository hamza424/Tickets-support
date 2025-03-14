const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// View all users
router.get("/admin/users", adminController.viewUsers);

// View all tickets with owners
router.get("/admin/tickets", adminController.viewTickets);

// Get ticket statistics
router.get("/admin/statistics", adminController.getStatistics);

module.exports = router;
