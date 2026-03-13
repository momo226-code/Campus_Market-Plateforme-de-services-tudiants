const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

dotenv.config();

const app = express();

// Configuration CORS pour accepter ton futur frontend sur Vercel
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Connexion optimisée pour Vercel (Serverless)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté ✅");
  } catch (err) {
    console.error("Erreur de connexion DB:", err);
  }
};

// Middleware pour connecter la DB à chaque requête
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ... (reste du code au dessus)

// 1. Déclare tes routes AVANT l'export
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/feedbacks", require("./routes/feedbackRoutes")); // Import direct ou via variable

app.get("/", (req, res) => {
  res.send("Campus-Market API is running 🚀");
});

// 2. Export pour Vercel (Doit être à la fin ou après les définitions de routes)
module.exports = app;

// 3. Écoute locale uniquement
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Serveur local sur le port ${PORT}`);
  });
}