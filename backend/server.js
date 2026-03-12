const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 1. Logique de connexion optimisée pour le Serverless
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // Déjà connecté ou en cours de connexion
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté ✅");
  } catch (err) {
    console.error("Erreur de connexion DB:", err);
  }
};

// 2. Middleware pour s'assurer que la DB est connectée à chaque requête
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// 3. Tes routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

app.get("/", (req, res) => {
  res.send("Server is running on Vercel 🚀");
});

// 4. IMPORTANT : Exportation pour Vercel (au lieu de app.listen)
// On garde le app.listen uniquement pour le développement local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

module.exports = app;