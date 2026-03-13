const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userName: { type: String, default: "Anonyme" },
  email: { type: String },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  categorySuggested: { type: String }, // Pour savoir quelle catégorie ils veulent ajouter
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", feedbackSchema);