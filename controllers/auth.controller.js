const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id,name:user.name, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Show login page
exports.showLogin = (req, res) => res.render("login", { error: null });

// Handle login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render("login", { error: "Invalid credentials" });
  }

  const token = generateToken(user);
  res.cookie("token", token, { httpOnly: true });
  res.redirect(`/${user.role}`);
};

// Logout
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

// Register (for testing)
exports.registerUserr = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, role });

    console.log("User registered successfully, redirecting...");
    res.redirect("/login");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


