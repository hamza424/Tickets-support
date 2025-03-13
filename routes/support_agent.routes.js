const express = require("express");
const Ticket = require("../models/Ticket");
const supportAgentController = require("../controllers/support.controller");
const router = express.Router();
const {
  authenticateJWT,
  authorizeRole,
} = require("../middlewares/authMiddleware");


router.get(
  "/support_agent",
  authenticateJWT,
  authorizeRole("support_agent"),
  (req, res) => res.render("support")
);

router.get(
  "/support_agent/tickets/:id",
  supportAgentController.getTicketDetails
);


// Get all tickets assigned to the logged-in support agent
router.get("/support_agent/tickets", supportAgentController.getAssignedTickets);

// Change ticket status
router.post(
  "/support_agent/tickets/:id/status",
  supportAgentController.updateTicketStatus
);



module.exports = router;