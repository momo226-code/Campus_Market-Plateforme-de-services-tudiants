const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  getServiceById, // 👈 AJOUTE CET IMPORT
  getMyServices,
  updateService,
  deleteService
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

// --- ROUTES DU DASHBOARD ---
router.get("/me", authMiddleware, getMyServices); 

// --- ROUTES PUBLIQUES ---
router.get("/", getServices);
// 👈 AJOUTE CETTE ROUTE pour que la page "Modifier" puisse lire les données
router.get("/:id", getServiceById); 

// --- ROUTES PROTÉGÉES ---
router.post("/", authMiddleware, createService);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;