const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

dotenv.config();

const app = express();

// ── CORS corrigé ──
const allowedOrigins = [
  "https://campus-market-plateforme-de-service-sandy.vercel.app",
  "https://campus-market-plateforme-de-service-kohl.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(cors({
  origin: function (origin, callback) {
    // Autorise les requêtes sans origin (Postman, mobile) + les origins listées
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Répondre aux preflight OPTIONS
app.options("*", cors());

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
app.use("/api/feedbacks", require("./routes/feedbackRoutes"));

app.get("/", (req, res) => {
  res.send("Campus-Market API is running 🚀");
});

// Export pour Vercel
module.exports = app;

// Écoute locale uniquement
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Serveur local sur le port ${PORT}`);
  });
}