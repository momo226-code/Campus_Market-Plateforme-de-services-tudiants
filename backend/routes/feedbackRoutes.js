const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST : Envoyer un avis (Ouvert à tous les utilisateurs)
router.post("/", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'envoi du feedback", error });
  }
});

// GET : Lire tous les avis (À réserver à l'Admin plus tard)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Les plus récents en premier
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error });
  }
});

module.exports = router;