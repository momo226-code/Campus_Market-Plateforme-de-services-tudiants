const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  getMyServices, // 👈 1. Ajoute l'import de la nouvelle fonction
  updateService,
  deleteService
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");

// --- ROUTES DU DASHBOARD ---
// C'est cette ligne qui manquait ! Elle doit être AVANT les routes avec :id
router.get("/me", authMiddleware, getMyServices); 

// --- ROUTES PUBLIQUES ---
router.get("/", getServices);

// --- ROUTES PROTÉGÉES ---
router.post("/", authMiddleware, createService);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;