const Ticket = require("../models/Ticket");

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log("User from request:", req.user);

    if (!req.user || !req.user.id) {
      // Fix: Use req.user.id instead of _id
      throw new Error("User is not authenticated");
    }

    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      throw new Error("Missing required fields");
    }

    const ticket = new Ticket({
      title,
      description,
      priority,
      user: req.user.id, // ✅ Fix: Use `id` instead of `_id`
    });

    await ticket.save();
    res.redirect("/tickets");
  } catch (err) {
    console.error("Ticket Creation Error:", err);
    res.status(500).send(`Error creating ticket: ${err.message}`);
  }
};



// Get all tickets for the authenticated user
exports.getTickets = async (req, res) => {
  try {
    // Log to check if the route is being hit
    console.log("Fetching tickets for user ID:", req.user.id); // user ID should be in req.user._id

    const tickets = await Ticket.find({ user: req.user.id }); // Find tickets for this user
    console.log("Tickets fetched:", tickets); // Log the tickets to check if they are being retrieved

    res.render("user", { tickets, user: req.user }); // Render the page with the tickets
  } catch (err) {
    console.error("Error retrieving tickets:", err); // Log any errors
    res.status(500).send("Error retrieving tickets");
  }
};



// Get ticket details for editing
exports.getEditTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket || ticket.user.toString() !== req.user.id.toString()) {
      return res.redirect("/tickets");
    }
    res.render("edit-ticket", { ticket });
  } catch (err) {
    res.status(500).send("Error retrieving ticket");
  }
};

// Edit ticket details
exports.editTicket = async (req, res) => {
  const { title, description, priority, status } = req.body;
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket || ticket.user.toString() !== req.user.id.toString()) {
      return res.redirect("/tickets");
    }

    ticket.title = title;
    ticket.description = description;
    ticket.priority = priority;
    ticket.status = status;
    ticket.updated_at = Date.now();
    await ticket.save();
    res.redirect("/tickets");
  } catch (err) {
    res.status(500).send(`Error updating ticket ${err.message}`);
  }
};

// Delete a ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket || ticket.user.toString() !== req.user.id.toString()) {
      return res.redirect("/tickets");
    }
    await Ticket.deleteOne({ _id: req.params.id });
    res.redirect("/tickets");
  } catch (err) {
    res.status(500).send(`Error deleting ticket ${err.message}`);
  }
};

// Update the ticket status (for support agents and admins)
exports.updateTicketStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    ticket.status = status;
    ticket.updated_at = Date.now();
    await ticket.save();
    res.redirect("/tickets");
  } catch (err) {
    res.status(500).send("Error updating ticket status");
  }
};
