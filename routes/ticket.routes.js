const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  authorizeRole,
} = require("../middlewares/authMiddleware");

const ticketController = require("../controllers/ticket.controller");
router.get("/tickets/create", authenticateJWT, (req, res) => {
  res.render("create-ticket"); // Ensure you have a create.ejs file
});

// Route to create a ticket (for users)
router.post(
  "/tickets/create",
  authenticateJWT,
  authorizeRole("user"),
  ticketController.createTicket
);

// Route to get all tickets (for users)
router.get(
  "/tickets",
  authenticateJWT,
  ticketController.getTickets
);

// Route to edit a ticket (for users)
router.get(
  "/tickets/edit/:id",
  authenticateJWT,
  ticketController.getEditTicket
);

// Route to update a ticket (for users)
router.post("/tickets/edit/:id", authenticateJWT, ticketController.editTicket);

// Route to delete a ticket (for users)
router.post(
  "/tickets/delete/:id",
  authenticateJWT,
  ticketController.deleteTicket
);

// Route to update the ticket status (for support agents and admins)
router.post(
  "/tickets/update-status/:id",
  authenticateJWT,
  authorizeRole("support_agent"),
  ticketController.updateTicketStatus
);

module.exports = router;
