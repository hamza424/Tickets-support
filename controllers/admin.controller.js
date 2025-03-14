const User = require("../models/User");
const Ticket = require("../models/Ticket");

// View all users
exports.viewUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role createdAt");
    res.render("admin/users", { users });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// View all tickets with owner details
exports.viewTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("owner", "name email");
    res.render("admin/tickets", { tickets });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({ status: "open" });
    const inProgressTickets = await Ticket.countDocuments({
      status: "in-progress",
    });
    const resolvedTickets = await Ticket.countDocuments({ status: "resolved" });
    const closedTickets = await Ticket.countDocuments({ status: "closed" });

    res.render("admin/statistics", {
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
