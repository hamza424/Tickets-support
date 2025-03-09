const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller"); // Adjust path if necessary

// Create a new ticket
router.post("/", ticketController.createTicket);

// Get all tickets
router.get("/", ticketController.getAllTickets);

// Get a ticket by ID
router.get("/:id", ticketController.getTicketById);

// Update a ticket by ID
router.patch("/:id", ticketController.updateTicket);

// Delete a ticket by ID
router.delete("/:id", ticketController.deleteTicket);

module.exports = router;
