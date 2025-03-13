const Ticket = require("../models/Ticket"); // Ensure you have a Ticket model

// Get all tickets assigned to the support agent, organized by status
exports.getAssignedTickets = async (req, res) => {
  try {
    const supportAgentId = req.user;

    console.log("Support Agent ID:", supportAgentId); // Debugging

    const tickets = await Ticket.find({ supportAgentId });

    console.log("Tickets Found:", tickets); // Debugging

    const groupedTickets = {
      open: [],
      "in-progress": [],
      resolved: [],
      closed: [],
    };

    tickets.forEach((ticket) => {
      groupedTickets[ticket.status].push(ticket);
    });

    res.render("supportAgentTickets", { groupedTickets });
  } catch (error) {
    console.error("Error fetching tickets:", error); // Log the full error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update the status of a ticket
exports.updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["open", "in-progress", "resolved", "closed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status;
    await ticket.save();

    // Redirect to the ticket details page after updating
    res.redirect(`/support_agent/tickets/${id}`);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getTicketDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Render the ticket details page
    res.render("ticketDetails", { ticket });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

