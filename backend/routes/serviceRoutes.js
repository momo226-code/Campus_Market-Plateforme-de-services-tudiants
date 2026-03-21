const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  getServiceById,
  getMyServices,
  updateService,
  deleteService
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/cloudinary"); // ← AJOUT

// --- ROUTES DU DASHBOARD ---
router.get("/me", authMiddleware, getMyServices);

// --- ROUTES PUBLIQUES ---
router.get("/", getServices);
router.get("/:id", getServiceById);

// --- ROUTES PROTÉGÉES ---
router.post("/", authMiddleware, upload.single("image"), createService); // ← MODIFIÉ
router.put("/:id", authMiddleware, upload.single("image"), updateService); // ← MODIFIÉ
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;