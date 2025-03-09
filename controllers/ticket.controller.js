const Ticket = require("../models/Ticket"); // Adjust the path if necessary

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority, userId } = req.body;

    const newTicket = new Ticket({
      title,
      description,
      priority,
      user: userId, // Assuming userId is passed in the request body
    });

    await newTicket.save();
    res
      .status(201)
      .json({ message: "Ticket created successfully", ticket: newTicket });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating ticket", error: error.message });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("user", "name email").exec(); // Populate user field
    res.status(200).json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tickets", error: error.message });
  }
};

// Get a ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("user", "name email")
      .exec();
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json(ticket);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ticket", error: error.message });
  }
};

// Update a ticket by ID
exports.updateTicket = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, status },
      { new: true, runValidators: true }
    );
    if (!updatedTicket)
      return res.status(404).json({ message: "Ticket not found" });

    res
      .status(200)
      .json({ message: "Ticket updated successfully", ticket: updatedTicket });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating ticket", error: error.message });
  }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket)
      return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting ticket", error: error.message });
  }
};
