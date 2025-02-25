const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (userData) => {
  const { username, email, password, role } = userData;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Cet email est déjà utilisé");
  }

  // Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer et sauvegarder l'utilisateur
  const user = new User({ username, email, password: hashedPassword, role });
  return await user.save();
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Mot de passe incorrect");
  }

  // Générer un token JWT
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { message: "Connexion réussie", token };
};

exports.getAllUsers = async () => {
  return await User.find().select("-password");
};

exports.getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }
  return user;
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
