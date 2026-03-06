const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  updateService,
  deleteService
} = require("../controllers/serviceController");

const authMiddleware = require("../middleware/authMiddleware"); // 👈 AJOUTER ÇA

router.post("/", authMiddleware, createService);
router.get("/", getServices);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;

