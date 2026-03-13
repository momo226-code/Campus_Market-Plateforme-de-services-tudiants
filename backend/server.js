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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

app.get("/", (req, res) => {
  res.send("Campus-Market API is running 🚀");
});

// Export pour Vercel
module.exports = app;

// Écoute locale uniquement (ne s'exécute pas sur Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Serveur local sur le port ${PORT}`);
  });
}



const feedbackRoutes = require("./routes/feedbackRoutes");
// ...
app.use("/api/feedbacks", feedbackRoutes);