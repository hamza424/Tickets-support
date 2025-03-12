const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const ticketRoutes = require("./routes/ticket.routes");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const roleRoutes = require("./routes/role.routes");
const path = require("path");

dotenv.config();
const app = express();

// Set up EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));


// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log(err));

// Utilisation des routes
app.use(userRoutes);
app.use(ticketRoutes);
app.use(authRoutes);
app.use(roleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server launched on port: ${PORT}`));
