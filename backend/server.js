const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// CORS — accepte tout (le plus simple et fiable)
app.use(cors());
app.options("*", cors());

app.use(express.json());

// Connexion MongoDB optimisée pour Vercel Serverless
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté ✅");
  } catch (err) {
    console.error("Erreur de connexion DB:", err);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use("/api/auth",      require("./routes/authRoutes"));
app.use("/api/services",  require("./routes/serviceRoutes"));
app.use("/api/feedbacks", require("./routes/feedbackRoutes"));

app.get("/", (req, res) => {
  res.send("Campus-Market API is running 🚀");
});

// Export pour Vercel
module.exports = app;

// Écoute locale uniquement
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Serveur local sur le port ${PORT}`));
}