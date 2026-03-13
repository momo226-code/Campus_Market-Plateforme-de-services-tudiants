const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST /api/feedbacks (On garde le "s" comme dans ton frontend)
router.post("/", async (req, res) => {
  try {
    const { comment, userName, rating } = req.body;
    
    const newFeedback = new Feedback({
      comment,
      userName,
      rating
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback capturé !" });
  } catch (error) {
    console.error("Erreur save feedback:", error);
    res.status(500).json({ message: "Erreur lors de l'enregistrement" });
  }
});

module.exports = router;